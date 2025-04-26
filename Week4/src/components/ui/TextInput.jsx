const TextInput = (props) => {
  return (
    <div className="flex w-full flex-col">
      <label htmlFor="title">{props.label}</label>
      <input
        className="my-2.5 rounded border-2 bg-stone-900 p-2.5"
        type="text"
        {...props}
      />
    </div>
  );
};

export default TextInput;
