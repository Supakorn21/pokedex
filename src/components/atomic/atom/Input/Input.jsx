import { Input as InputAntd } from 'antd';

const Input = ({
  value,
  onSearchChange,
  placeholder = 'typing...',
  ...props
}) => {
  const handleOnInputChange = (e) => {
    const value = e?.target?.value;

    onSearchChange(value);
  };
  return (
    <InputAntd
      {...props}
      value={value}
      onChange={handleOnInputChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
