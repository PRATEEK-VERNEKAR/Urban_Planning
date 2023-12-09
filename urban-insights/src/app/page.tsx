import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-4">
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold tracking-wide">Satellite Theme</h1>
      <p className="text-lg">Explore the universe with our amazing satellite-themed website!</p>
    </header>

    <section className="flex-grow my-8">
      <h2 className="text-2xl font-bold mb-4">About Us</h2>
      <p>
        Discover the wonders of space through stunning satellite images and real-time space news updates. Our interactive stargazing experience will take you on an exciting journey through the cosmos.
      </p>
    </section>

    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Key Features</h2>
      <ul className="list-disc list-inside">
        <li>Stunning satellite images</li>
        <li>Real-time space news updates</li>
        <li>Interactive stargazing experience</li>
      </ul>
    </section>

    <section className="my-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Sign Up Now!</h2>
      <p className="mb-4">Don't miss out on the latest space adventures. Join our community today!</p>
      <button className="bg-green-500 text-white py-2 px-4 rounded-full">Sign Up</button>
    </section>

    <footer className="bg-gray-700 text-white py-2 text-center">
      <p>&copy; 2023 Satellite Explorer</p>
    </footer>
  </div>
  )
}
