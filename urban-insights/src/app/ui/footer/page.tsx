import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="w-full bg-red-900 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold tracking-wide">Satellite Explorer</h1>
        <p className="text-lg">Explore the universe with our amazing satellite-themed website!</p>
      </div>
    </footer>
  )
}
