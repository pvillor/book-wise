import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold text-gray-100">
        Página não encontrada
      </h1>
      <p className="text-accent-foreground text-gray-100">
        Voltar para o{' '}
        <Link href="/" className="text-purple-100">
          Dashboard
        </Link>
      </p>
    </div>
  )
}
