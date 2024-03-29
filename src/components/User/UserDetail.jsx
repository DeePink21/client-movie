import React, { Component } from "react";
import { Redirect } from "react-router";
import Login from "../../pages/Login";
import UserService from "../../services/UserService";
import MovieOrderList from "./MovieOrderList";

export default class UserDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      userId: null,
      isLogged: window.sessionStorage.getItem("user") ? true : false,
      phone: "",
      fullName: " ",
      firstName: "",
      lastName: "",
      email: "",
      query: "",
      orders: [],
    };
  }

  componentDidMount() {
    if (window.sessionStorage.getItem("user")) {
      let user = JSON.parse(window.sessionStorage.getItem("user"));
      let phone = parseInt(localStorage.phone);
      this.setState({
        user: user,
        fullName: user.fullName,
        email: user.email,
        phone: phone ? phone : "",
      });
    }
  }

  isInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  updateUser = (e) => {
    e.preventDefault();
    var token = window.sessionStorage.getItem("token");
    console.log(token);
    var user = {
      ...this.state.user,
      ...{
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      },
    };
    UserService.updateUser(user, token).then((res) => {
      console.log(res.data);
      alert("Cập nhật thành công!");
    });
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    if (!this.state.isLogged) {
      <Redirect
        to={{
          pathname: "/login",
          search: "?action=user",
          // state: { referrer: currentLocation }
        }}
      />;

      return <Login />;
    }
    return (
      <div className="event-facility padding-bottom padding-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
              <div className="checkout-widget checkout-contact">
                <h5 className="title">Thông tin người dùng </h5>
                <form className="checkout-contact-form">
                  <div className="form-group">
                    Xin Chào! <a href="#0">{this.state.fullName}</a>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Họ "
                      value={this.state.firstName}
                      onChange={(e) => this.isInputChange(e)}
                      name="firstName"
                      id="firstName"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Tên "
                      value={this.state.lastName}
                      onChange={(e) => this.isInputChange(e)}
                      name="lastName"
                      id="lastName"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email "
                      value={this.state.email}
                      onChange={(e) => this.isInputChange(e)}
                      name="email"
                      id="email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      placeholder="Số điện thoại "
                      value={this.state.phone}
                      onChange={(e) => this.isInputChange(e)}
                      name="phone"
                      id="phone"
                      // required
                      //  pattern="/((09|03|07|08|05)+([0-9]{8})\b)/g"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onClick={(e) => {
                        this.updateUser(e);
                      }}
                      type="submit"
                      value="Cập nhật thông tin"
                      className="custom-button"
                    />
                  </div>
                </form>
              </div>
              <div className="checkout-widget checkout-contact">
                <h5 className="title">Lịch sử đặt vé</h5>

                <div className="row mb-30-none">
                  <div className="col-md-6 col-xl-7">
                    <form className="checkout-contact-form mb-0">
                      <div className="form-group">
                        <input
                          value={this.state.query}
                          onChange={(e) => this.isInputChange(e)}
                          name="query"
                          type="text"
                          // defaultValue=""
                          placeholder="Tìm phim đã đặt"
                        />
                      </div>
                      {/* <div className="form-group">
                        <input
                          type="submit"
                          defaultValue="Verify"
                          className="custom-button"
                        />
                      </div> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
          <MovieOrderList
            userId={1}
            // {this.state.user.id}
          ></MovieOrderList>
        </div>
      </div>
    );
  }
}
