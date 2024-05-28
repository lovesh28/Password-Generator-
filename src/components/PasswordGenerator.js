import React, { useState, useRef } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12); // Set a default length for the password
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const passwordRef = useRef(null);

  const generatePassword = () => {
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charPool = '';
    if (includeUppercase) charPool += upperCaseChars;
    if (includeLowercase) charPool += lowerCaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (charPool === '') {
      alert('Please select at least one character type.');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      generatedPassword += charPool[randomIndex];
    }

    localStorage.setItem('generatedPassword', generatedPassword);
    setPassword(generatedPassword);
  };

  const copyfunction = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, 99999); // For mobile devices

      document.execCommand('copy');
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 1000); // Tooltip will be visible for 2 seconds
    }
  };

  return (
    <div className="password-generator-container">
      <div className="password-generator">
        <h1>Password Generator</h1>
        <div className="settings">
          <div>
            <label>Password Length:</label>
            <input
              type="number"
              min="1"
              max="128"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              Include Uppercase Letters
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
              Include Lowercase Letters
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              Include Numbers
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
              Include Symbols
            </label>
          </div>
          <button onClick={generatePassword}>Generate Password</button>
        </div>
        <div className="output">
          <h2>Your Generated Password:</h2>
          <div className="password-card">
            <textarea ref={passwordRef} value={password} readOnly />
          </div>
          <button onClick={copyfunction}>COPY PASSWORD</button>
          {showTooltip && <div className="tooltip">Password copied</div>}
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
