import { useState } from "react";
import "./App.css";
import { trackButtonClick } from "./analytics";

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // פונקציה שמטפלת בלחיצה על כפתור
  const handleClick = (buttonName: string) => {
    trackButtonClick(buttonName);
    setClickCount((prev) => prev + 1);
  };

  // פונקציה שמטפלת בשליחת טופס
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // שליחת event ל-Google Analytics
    trackButtonClick("Contact Form Submitted");

    // הצגת הודעת הצלחה
    setFormSubmitted(true);

    // איפוס הטופס אחרי 3 שניות
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  // עדכון שדות בטופס
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="App">
      <h1>Google Analytics Demo</h1>
      <p className="subtitle">מעקב אחר לחיצות על כפתורים ושליחת טפסים</p>

      {/* קטע הכפתורים */}
      <div className="card">
        <h2>מעקב אחר כפתורים</h2>
        <p>
          סה"כ לחיצות: <strong>{clickCount}</strong>
        </p>

        <div className="button-container">
          <button
            className="btn btn-primary"
            onClick={() => handleClick("Primary Button")}
          >
            כפתור ראשי
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => handleClick("Secondary Button")}
          >
            כפתור משני
          </button>

          <button
            className="btn btn-success"
            onClick={() => handleClick("Success Button")}
          >
            כפתור הצלחה
          </button>
        </div>

        <p className="info">
          🔍 פתחי את הקונסול (F12) כדי לראות את ה-Events שנשלחים
        </p>
      </div>

      {/* קטע הטופס */}
      <div className="card form-section">
        <h2>מעקב אחר שליחת טופס</h2>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">שם מלא:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="הכניסי את שמך"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">אימייל:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="example@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">הודעה:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="כתבי את הודעתך כאן..."
            />
          </div>

          <button type="submit" className="btn-submit">
            שלחי טופס
          </button>
        </form>

        {formSubmitted && (
          <div className="success-message">
            ✅ הטופס נשלח בהצלחה! Event נשלח ל-Google Analytics
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
