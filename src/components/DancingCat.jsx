import { useState, useEffect } from 'react'
import catSvg from '../assets/images/cat.svg'
import '../styles/animations.css'

function DancingCat() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
    setClickCount(prev => prev + 1)
  }

  const handleKeyPress = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      toggleAnimation()
    }
  }

  useEffect(() => {
    const handleGlobalKeyPress = (event) => {
      if (event.key === ' ') {
        event.preventDefault()
        toggleAnimation()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyPress)
    return () => window.removeEventListener('keydown', handleGlobalKeyPress)
  }, [isAnimating])

  return (
    <div className="dancing-cat-container">
      <h1 className="title">🐱 댄싱 고양이 🐱</h1>

      <div className="cat-stage">
        <img
          src={catSvg}
          alt="Dancing Cat"
          className={`dancing-cat ${isAnimating ? 'dancing' : ''}`}
          onClick={toggleAnimation}
          style={{ cursor: 'pointer' }}
          title="고양이를 클릭하여 댄스를 시작/정지하세요!"
        />
      </div>

      <div className="controls">
        <button
          onClick={toggleAnimation}
          onKeyDown={handleKeyPress}
          className={`dance-button ${isAnimating ? 'stop' : 'start'}`}
          aria-label={isAnimating ? '댄스 정지' : '댄스 시작'}
          tabIndex={0}
        >
          {isAnimating ? '🛑 댄스 정지' : '💃 댄스 시작'}
        </button>
      </div>

      <div className="stats">
        <p className="click-counter">
          댄스 횟수: <span className="count">{clickCount}</span>번
        </p>
        <p className="instruction">
          💡 스페이스바를 눌러도 댄스를 시작/정지할 수 있어요!
        </p>
      </div>

      <div className="music-note">
        {isAnimating && (
          <div className="floating-notes">
            <span className="note">♪</span>
            <span className="note">♫</span>
            <span className="note">♪</span>
            <span className="note">♫</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default DancingCat