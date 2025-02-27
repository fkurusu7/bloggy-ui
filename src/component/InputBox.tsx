// @typescript-eslint/no-unused-vars

export interface InputData {
  name: string;
  type: string;
  id: string;
  value: string;
  placeholder: string;
  icon: string;
  handleChange: () => void;
}

function InputBox({ name, type, id, value, placeholder, icon, handleChange }: InputData) {
  icon;
  return (
    <div>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value || ''}
        onChange={handleChange}
        className="input-box"
      />
    </div>
  );
}

export default InputBox;
