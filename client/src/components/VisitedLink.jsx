import "../style/refer.css";

const VisitedLink = ({
  url,
  title,
  value,
  onClickLink,
  currentAccount,
  disabled,
  className,
  key
}) => {
  return (
    <a
      onClick={onClickLink}
      className={`task-button social-link cursor-pointer ${className}  `}
      href={url}
      data-reward={currentAccount > 0 ? value : 0}
      disabled={disabled}
      key={key}
    >
      {title}
    </a>
  );
};

export default VisitedLink;
