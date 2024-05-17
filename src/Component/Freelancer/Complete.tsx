import ClientSideBar from '../Home/Client/ClientSideBar'

function Complete() {
  return (
    <ClientSideBar>
      <div className="max-h-screen bg-background flex justify-center items-center">
        <div className="text-center">
          <img src='https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif' />
          <h2 className="mt-8 text-3xl font-extrabold text-gray-900">Payment Successful</h2>
          <p className="text-sm text-gray-600">Thank you for your purchase! You will receive a confirmation email shortly.</p>
        </div>
      </div>
    </ClientSideBar>
  )
}

export default Complete