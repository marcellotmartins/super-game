"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface GameObject {
  x: number
  y: number
  width: number
  height: number
  velocityX?: number
  velocityY?: number
  type?: string
  collected?: boolean
  dead?: boolean
}

interface Player extends GameObject {
  velocityX: number
  velocityY: number
  jumping: boolean
  direction: "left" | "right"
}

export default function MarioGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)
  const gameLoopRef = useRef<number>()
  const keysRef = useRef<{ [key: string]: boolean }>({})

  const initializeGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    // Player
    const player: Player = {
      x: 100,
      y: 300,
      width: 32,
      height: 32,
      velocityX: 0,
      velocityY: 0,
      jumping: false,
      direction: "right",
    }

    // Platforms
    const platforms: GameObject[] = [
      { x: 0, y: 550, width: 800, height: 50 },
      { x: 200, y: 450, width: 150, height: 20 },
      { x: 400, y: 350, width: 150, height: 20 },
      { x: 600, y: 250, width: 150, height: 20 },
      { x: 100, y: 200, width: 100, height: 20 },
      { x: 500, y: 150, width: 120, height: 20 },
    ]

    // Coins
    const coins: GameObject[] = [
      { x: 250, y: 400, width: 20, height: 20, type: "coin", collected: false },
      { x: 450, y: 300, width: 20, height: 20, type: "coin", collected: false },
      { x: 650, y: 200, width: 20, height: 20, type: "coin", collected: false },
      { x: 150, y: 150, width: 20, height: 20, type: "coin", collected: false },
      { x: 550, y: 100, width: 20, height: 20, type: "coin", collected: false },
      { x: 300, y: 500, width: 20, height: 20, type: "coin", collected: false },
      { x: 700, y: 500, width: 20, height: 20, type: "coin", collected: false },
    ]

    // Enemies
    const enemies: GameObject[] = [
      { x: 300, y: 518, width: 30, height: 30, velocityX: 2, type: "enemy", dead: false },
      { x: 500, y: 518, width: 30, height: 30, velocityX: -2, type: "enemy", dead: false },
      { x: 250, y: 418, width: 30, height: 30, velocityX: 1.5, type: "enemy", dead: false },
    ]

    return { ctx, player, platforms, coins, enemies }
  }, [])

  const drawPlayer = (ctx: CanvasRenderingContext2D, player: Player) => {
    // Body
    ctx.fillStyle = "#ef4444"
    ctx.fillRect(player.x, player.y, player.width, player.height)

    // Face
    ctx.fillStyle = "#fbbf24"
    ctx.fillRect(player.x + 8, player.y + 8, 16, 16)

    // Eyes
    ctx.fillStyle = "#000"
    if (player.direction === "right") {
      ctx.fillRect(player.x + 16, player.y + 12, 4, 4)
      ctx.fillRect(player.x + 22, player.y + 12, 4, 4)
    } else {
      ctx.fillRect(player.x + 6, player.y + 12, 4, 4)
      ctx.fillRect(player.x + 12, player.y + 12, 4, 4)
    }

    // Hat
    ctx.fillStyle = "#dc2626"
    ctx.fillRect(player.x + 4, player.y, 24, 8)
  }

  const drawPlatform = (ctx: CanvasRenderingContext2D, platform: GameObject) => {
    ctx.fillStyle = "#22c55e"
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height)

    // Grass texture
    ctx.fillStyle = "#16a34a"
    for (let i = 0; i < platform.width; i += 10) {
      ctx.fillRect(platform.x + i, platform.y, 2, 4)
    }
  }

  const drawCoin = (ctx: CanvasRenderingContext2D, coin: GameObject) => {
    if (coin.collected) return

    ctx.fillStyle = "#fbbf24"
    ctx.beginPath()
    ctx.arc(coin.x + coin.width / 2, coin.y + coin.height / 2, coin.width / 2, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#f59e0b"
    ctx.beginPath()
    ctx.arc(coin.x + coin.width / 2, coin.y + coin.height / 2, coin.width / 3, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawEnemy = (ctx: CanvasRenderingContext2D, enemy: GameObject) => {
    if (enemy.dead) return

    ctx.fillStyle = "#8b5cf6"
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)

    // Eyes
    ctx.fillStyle = "#fff"
    ctx.fillRect(enemy.x + 6, enemy.y + 8, 6, 6)
    ctx.fillRect(enemy.x + 18, enemy.y + 8, 6, 6)

    ctx.fillStyle = "#000"
    ctx.fillRect(enemy.x + 8, enemy.y + 10, 3, 3)
    ctx.fillRect(enemy.x + 20, enemy.y + 10, 3, 3)
  }

  const checkCollision = (obj1: GameObject, obj2: GameObject) => {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    )
  }

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setLives(3)
    setLevel(1)

    const game = initializeGame()
    if (!game) return

    const { ctx, player, platforms, coins, enemies } = game
    const canvas = canvasRef.current!
    const gravity = 0.6
    const jumpStrength = -12
    const moveSpeed = 5

    const gameLoop = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw sky
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#60a5fa")
      gradient.addColorStop(1, "#93c5fd")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Handle input
      if (keysRef.current["ArrowLeft"] || keysRef.current["a"]) {
        player.velocityX = -moveSpeed
        player.direction = "left"
      } else if (keysRef.current["ArrowRight"] || keysRef.current["d"]) {
        player.velocityX = moveSpeed
        player.direction = "right"
      } else {
        player.velocityX = 0
      }

      if ((keysRef.current["ArrowUp"] || keysRef.current["w"] || keysRef.current[" "]) && !player.jumping) {
        player.velocityY = jumpStrength
        player.jumping = true
      }

      // Apply gravity
      player.velocityY += gravity
      player.x += player.velocityX
      player.y += player.velocityY

      // Platform collision
      player.jumping = true
      platforms.forEach((platform) => {
        if (checkCollision(player, platform)) {
          if (player.velocityY > 0 && player.y + player.height - player.velocityY <= platform.y) {
            player.y = platform.y - player.height
            player.velocityY = 0
            player.jumping = false
          }
        }
      })

      // Coin collection
      coins.forEach((coin) => {
        if (!coin.collected && checkCollision(player, coin)) {
          coin.collected = true
          setScore((prev) => prev + 100)
        }
      })

      // Enemy collision and movement
      enemies.forEach((enemy) => {
        if (enemy.dead) return

        enemy.x += enemy.velocityX!

        // Enemy platform collision
        if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
          enemy.velocityX! *= -1
        }

        platforms.forEach((platform) => {
          if (enemy.x < platform.x || enemy.x + enemy.width > platform.x + platform.width) {
            if (enemy.y + enemy.height >= platform.y && enemy.y + enemy.height <= platform.y + 10) {
              enemy.velocityX! *= -1
            }
          }
        })

        if (checkCollision(player, enemy)) {
          // Jump on enemy
          if (player.velocityY > 0 && player.y + player.height - 10 < enemy.y) {
            enemy.dead = true
            player.velocityY = jumpStrength / 2
            setScore((prev) => prev + 200)
          } else {
            // Hit by enemy
            setLives((prev) => {
              const newLives = prev - 1
              if (newLives <= 0) {
                setGameOver(true)
                setGameStarted(false)
              }
              return newLives
            })
            player.x = 100
            player.y = 300
            player.velocityX = 0
            player.velocityY = 0
          }
        }
      })

      // Boundaries
      if (player.x < 0) player.x = 0
      if (player.x + player.width > canvas.width) player.x = canvas.width - player.width
      if (player.y > canvas.height) {
        setLives((prev) => {
          const newLives = prev - 1
          if (newLives <= 0) {
            setGameOver(true)
            setGameStarted(false)
          }
          return newLives
        })
        player.x = 100
        player.y = 300
        player.velocityX = 0
        player.velocityY = 0
      }

      // Check level complete
      const allCoinsCollected = coins.every((coin) => coin.collected)
      if (allCoinsCollected) {
        setLevel((prev) => prev + 1)
        setScore((prev) => prev + 1000)
        coins.forEach((coin) => (coin.collected = false))
        player.x = 100
        player.y = 300
      }

      // Draw everything
      platforms.forEach((platform) => drawPlatform(ctx, platform))
      coins.forEach((coin) => drawCoin(ctx, coin))
      enemies.forEach((enemy) => drawEnemy(ctx, enemy))
      drawPlayer(ctx, player)

      // Draw HUD
      ctx.fillStyle = "#000"
      ctx.font = "bold 20px monospace"
      ctx.fillText(`Score: ${score}`, 10, 30)
      ctx.fillText(`Lives: ${lives}`, 10, 60)
      ctx.fillText(`Level: ${level}`, 10, 90)

      if (gameStarted) {
        gameLoopRef.current = requestAnimationFrame(gameLoop)
      }
    }

    gameLoop()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (gameStarted) {
      startGame()
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameStarted])

  return (
    <Card className="p-6 bg-white/95 backdrop-blur shadow-2xl">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-primary mb-2">Super Mario Game</h1>

        {!gameStarted && !gameOver && (
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">Use Arrow Keys or WASD to move and jump!</p>
            <p className="text-sm text-muted-foreground">Collect coins, avoid enemies, and reach new levels!</p>
            <Button onClick={startGame} size="lg" className="text-lg px-8">
              Start Game
            </Button>
          </div>
        )}

        {gameOver && (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-destructive">Game Over!</h2>
            <p className="text-xl">Final Score: {score}</p>
            <p className="text-lg">Level Reached: {level}</p>
            <Button onClick={startGame} size="lg" className="text-lg px-8">
              Play Again
            </Button>
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border-4 border-primary rounded-lg shadow-lg"
          style={{ display: gameStarted ? "block" : "none" }}
        />

        {gameStarted && (
          <div className="flex gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setGameStarted(false)
                if (gameLoopRef.current) {
                  cancelAnimationFrame(gameLoopRef.current)
                }
              }}
            >
              Pause Game
            </Button>
          </div>
        )}

        <div className="text-sm text-muted-foreground text-center mt-4">
          <p>🎮 Controls: Arrow Keys or WASD to move, Space/Up to jump</p>
          <p>🪙 Collect all coins to advance to the next level</p>
          <p>👾 Jump on enemies to defeat them</p>
        </div>
      </div>
    </Card>
  )
}
