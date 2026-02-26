import { Link } from "react-router-dom"

export function Page({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <div className="rounded-3xl bg-slate-300/70 p-10 shadow-sm border border-slate-300">
          <div className="text-center">
            {title ? (
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {title}
              </h1>
            ) : null}

            {subtitle ? (
              <p className="mt-2 text-sm text-slate-700">{subtitle}</p>
            ) : null}
          </div>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  )
}

export function ButtonLink({ to, children, variant = "primary" }) {
  const base =
    "w-full rounded-full py-3 text-sm font-semibold transition text-center block"
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-blue-500 text-white hover:bg-blue-600",
    success: "bg-green-700 text-white hover:bg-green-800",
    outline: "border border-slate-500 text-slate-900 hover:bg-white/60",
  }

  return (
    <Link to={to} className={`${base} ${styles[variant]}`}>
      {children}
    </Link>
  )
}

export function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-full border border-slate-400 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
    />
  )
}

export function Row({ children }) {
  return <div className="grid gap-4">{children}</div>
}

export function SmallLinksRow({ left, right }) {
  return (
    <div className="mt-4 flex items-center justify-between text-xs text-slate-700">
      {left}
      {right}
    </div>
  )
}