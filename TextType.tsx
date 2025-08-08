'use client'

import { useState, useEffect } from 'react'

interface TextTypeProps {
  text: string[]
  typingSpeed?: number
  pauseDuration?: number
  showCursor?: boolean
  cursorCharacter?: string
  className?: string
}

export default function TextType({
  text,
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
  className = ""
}: TextTypeProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    if (!isTyping) return

    const currentText = text[currentTextIndex]
    
    if (currentCharIndex < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayText(currentText.slice(0, currentCharIndex + 1))
        setCurrentCharIndex(currentCharIndex + 1)
      }, typingSpeed)
      
      return () => clearTimeout(timer)
    } else {
      // Finished typing current text - stop here instead of looping
      const timer = setTimeout(() => {
        setIsTyping(false)
        // Don't reset or continue to next text
      }, pauseDuration)
      
      return () => clearTimeout(timer)
    }
  }, [currentCharIndex, currentTextIndex, isTyping, text, typingSpeed, pauseDuration])

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span className="animate-pulse">{cursorCharacter}</span>
      )}
    </span>
  )
}
