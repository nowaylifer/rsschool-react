type Props = {
  label: string;
  code: string;
};

const CountryItem = ({ label, code }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <div className={`fflag fflag-${code} ff-md`}></div>
      {label}
    </div>
  );
};

export default CountryItem;
