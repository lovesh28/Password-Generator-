import React, { useState } from "react";

const PasswordGenerator = () => {
    const [length, setLength] = useState(8);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [password, setPassword] = useState('');
  
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
  
      let generatedPassword = ("");
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        generatedPassword += charPool[randomIndex];
      }
  
      console.log(generatedPassword);
      localStorage.setItem('generatedPassword', generatedPassword);
      setPassword(generatedPassword);
    };
    return(
        <>
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
        <textarea value={password} readOnly />
        </div>

    </div>
     </div>
    </div>
        </>
    );
};

export default PasswordGenerator;