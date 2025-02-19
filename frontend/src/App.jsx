  import { useEffect, useState } from "react";

  const App = () => {
    const [user, setUser] = useState(null);
    const [about, setAbout] = useState(null);
    const [contact, setContact] = useState({ name: "", email: "", message: "" });
    const [responseMessage, setResponseMessage] = useState("");

    useEffect(() => {
      fetch("http://localhost:5000/api/user")
        .then((res) => res.json())
        .then((data) => setUser(data));

      fetch("http://localhost:5000/api/about")
        .then((res) => res.json())
        .then((data) => setAbout(data));
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      const data = await res.json();
      setResponseMessage(data.message);
      setContact({ name: "", email: "", message: "" });
    };

    return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4">
        {/* Header */}
        {user && (
          <header className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white w-full p-6 flex items-center shadow-lg rounded-lg">
            <img src={user.profilePic} alt="Profile" className="w-14 h-14 rounded-full border-2 border-white shadow-lg mr-4" />
            <div>
              <p className="text-sm">Hello, Welcome 🎉</p>
              <h2 className="text-xl font-bold">{user.name}</h2>
            </div>
          </header>
        )}

        {/* About Us Section */}
        {about && (
          <section className="bg-white p-6 rounded-lg shadow-lg mt-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">{about.title}</h2>
            <img src={about.image} alt="About" className="w-full h-64 object-cover rounded-lg shadow-md mb-4" />
            <p className="text-gray-600 leading-relaxed">{about.description}</p>
          </section>
        )}

        {/* Contact Us Section */}
        <section className="bg-white p-6 rounded-lg shadow-lg mt-6 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Contact Us</h2>
          <p className="flex items-center mb-2 text-gray-700">📧 {user?.email}</p>
          <p className="flex items-center mb-4 text-gray-700">📞 {user?.phone}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <textarea
              placeholder="Enter your query..."
              value={contact.message}
              onChange={(e) => setContact({ ...contact, message: e.target.value })}
              className="border p-3 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            ></textarea>
            <button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white p-3 w-full rounded-lg shadow-md font-bold transition duration-300">
              Submit
            </button>
          </form>
          {responseMessage && <p className="text-green-600 mt-3 font-semibold">{responseMessage}</p>}
        </section>
        <br />
        <br />
        <br />
        <br />
        <br />

        {/* Bottom Navigation */}
        <nav className="bg-white fixed bottom-0 w-full flex justify-around py-3 border-t shadow-lg rounded-t-lg">
          <button className="text-gray-600 hover:text-purple-600 transition">🏠 Home</button>
          <button className="text-gray-600 hover:text-purple-600 transition">📜 Compliance</button>
          <button className="text-gray-600 hover:text-purple-600 transition">🛡️ Eligibility</button>
          <button className="text-gray-600 hover:text-purple-600 transition">📚 Resource</button>
        </nav>
      </div>
    );
  };

  export default App;
