import "../style/refer.css";

const VisitedLink = ({ url, title, value, onClickLink,currentAccount }) => {
  return (
    <a
      onClick={onClickLink}
      className="task-button social-link"
      href={url}
      data-reward={currentAccount > 0 ? value : 0}
    >
      {title}
    </a>
  );
};

export default VisitedLink;
