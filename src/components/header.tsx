import React from "react";
import { Link } from "gatsby";
import "../styles/components/header.css";

type HeaderState = {};
type HeaderProps = {
  title: string;
  links: Array<{ name: string; path: string }>;
};

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
  }

  render() {
    return (
      <>
        <h1 className="header__title">{this.props.title}</h1>

        <div className="header__sidebar">
          <button>
            <svg
              className="header__hamburger"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
          <div className="header__col">
            {this.props.links.map((el) => (
              <Link key={el.name} className="header__link" to={el.path}>
                {el.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="header__row">
          {this.props.links.map((el) => (
            <Link
              key={el.name}
              className="header__link header__link--row"
              to={el.path}
            >
              {el.name}
            </Link>
          ))}
        </div>
      </>
    );
  }
}

export default Header;
