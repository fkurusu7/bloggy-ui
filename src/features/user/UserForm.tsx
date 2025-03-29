import Button from '../../component/Button';

function UserForm() {
  return (
    <form className="user__form">
      <div className="user__form-box">
        <label htmlFor="fullname">Fullname</label>
        <input
          type="text"
          name="fullname"
          id="fullname"
          value={'no value for the moment'}
          onChange={() => {}}
          className={`user__form-input`}
          autoFocus
        />
      </div>
      <div className="user__form-box">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={'no value for the moment'}
          onChange={() => {}}
          className={`user__form-input`}
        />
      </div>
      <div className="user__form-box">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          value={'no value for the moment'}
          onChange={() => {}}
          className={`user__form-input`}
        />
      </div>
      <div className="user__form-box">
        <label htmlFor="password_conf">Password Confirmation</label>
        <input
          type="password"
          name="password_conf"
          id="password_conf"
          placeholder="********"
          value={'no value for the moment'}
          onChange={() => {}}
          className={`user__form-input`}
        />
      </div>
      <div className="user__form-box">
        <Button type="submit" size="small" variant="form">
          Update
        </Button>
      </div>
    </form>
  );
}

export default UserForm;
