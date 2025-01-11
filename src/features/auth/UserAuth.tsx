function UserAuth({ type }) {
  return (
    <div className="auth__container">
      <div className="auth__form-container">
        <h1 className="heading-1">{type === 'signin' ? 'Sign In' : 'Sign Up'}</h1>
        <form className="auth__form">.</form>
      </div>
    </div>
  );
}

export default UserAuth;
