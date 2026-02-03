export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test de Archivos Estáticos</h1>
      <div className="space-y-2">
        <a href="/demos/page-1.html" className="block text-blue-600 hover:underline" target="_blank">
          Demo 1: page-1.html
        </a>
        <a href="/demos/page-2.html" className="block text-blue-600 hover:underline" target="_blank">
          Demo 2: page-2.html
        </a>
        <a href="/demos/page-3.html" className="block text-blue-600 hover:underline" target="_blank">
          Demo 3: page-3.html
        </a>
        <a href="/demos/page-4.html" className="block text-blue-600 hover:underline" target="_blank">
          Demo 4: page-4.html
        </a>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Iframe de Prueba:</h2>
        <iframe 
          src="/demos/page-1.html" 
          className="w-full border-2 border-gray-300"
          style={{ height: '600px' }}
          title="Test iframe"
        />
      </div>
    </div>
  )
}
