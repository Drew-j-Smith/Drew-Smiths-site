import React from "react";
import { Link } from "gatsby";
import "../styles/components/header.scss";

type HeaderState = {
  showDropdown: boolean;
};
type HeaderProps = {
  title: string;
  links: Array<{ name: string; path: string }>;
};

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = { showDropdown: false };
  }

  render() {
    return (
      <>
        <div className="header__container">
          <button
            onClick={() => {
              this.setState((prevState) => {
                return {
                  showDropdown: !prevState.showDropdown,
                };
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#000000"
            >
              <path
                style={this.state.showDropdown ? { opacity: 0 } : {}}
                d="M0 0h24v24H0V0z"
                fill="none"
              />
              <path
                style={this.state.showDropdown ? { opacity: 0 } : {}}
                d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
              />
              <path
                style={this.state.showDropdown ? {} : { opacity: 0 }}
                d="M0 0h24v24H0V0z"
                fill="none"
              />
              <path
                style={this.state.showDropdown ? {} : { opacity: 0 }}
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
              />
            </svg>
          </button>
          <div className="header__row">
            {this.props.links.map((el) => (
              <Link key={el.name} to={el.path}>
                {el.name}
              </Link>
            ))}
          </div>
          <h1>{this.props.title}</h1>
          <div></div>
        </div>
        <div
          className="header__col"
          style={
            this.state.showDropdown ? { opacity: 1, pointerEvents: "all" } : {}
          }
        >
          {this.props.links.map((el) => (
            <Link
              key={el.name}
              style={
                this.state.showDropdown
                  ? {}
                  : {
                      transform: "translateY(50%)",
                    }
              }
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
