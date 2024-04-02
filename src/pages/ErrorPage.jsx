const imgURL =
  "https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7879.jpg";

function ErrorPage() {
  return (
    <div>
      <h1 className="order-title">404</h1>
      <img src={imgURL} alt="404 error gif" className="page-img" />
    </div>
  );
}

export default ErrorPage;