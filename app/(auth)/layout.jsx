
const AuthLayout = ({ children }) => {
  return (
    <main className="flex justify-center items-center bg-white w-screen h-screen z-50 absolute">
      <div>
        {children}
      </div>
    </main>
  )
}

export default AuthLayout