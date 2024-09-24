'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold text-gray-100">
        Whoops, algo aconteceu...
      </h1>
      <p className="text-accent-foreground text-gray-100">
        Um erro aconteceu na aplicação, abaixo você encontra mais detalhes
      </p>
      <pre className="text-gray-100 break-words">
        {error?.message || JSON.stringify(error)}
      </pre>
      <button onClick={() => reset()}>
        <p className="text-accent-foreground text-purple-100 hover:cursor-pointer hover:text-purple-200">
          Tente novamente
        </p>
      </button>
    </div>
  )
}
