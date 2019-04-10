import React, { Component } from "react";
import { connect } from "react-redux";
import { showLoader, getArtistDetail } from "../../actions/artist";
import Styles from "./styles.module.scss";

class Artist extends Component {
  state = {
    artistName: ""
  };

  artistName = e => {
    this.setState({
      artistName: e.target.value
    });
  };

  getEventDetail = () => {
    this.props.showLoader(); // Show loader before API hit Action
    this.props.getArtistDetail(this.state.artistName); // API hit Action for Artist name, image, Facebook url and Events list
    this.setState({ artistName: "" });
  };

  formatEventDate = date => { // Format Event Date and Time
    let tempDate = new Date(date);
    return (
      tempDate.getDate() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getFullYear() +
      " " +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes()
    );
  };

  renderEvents = eventData => { // Print Events
    if (eventData.events) {
      if (eventData.events.length) {
        return (
          <React.Fragment>
            <h3 className="text-center">Events</h3>
            <div className={`row ${Styles.venueWrapper}`}>
              <div className="col">
                <b>Venue</b>
              </div>
              <div className="col">
                <b>City</b>
              </div>
              <div className="col">
                <b>Country</b>
              </div>
              <div className="col">
                <b> Date</b>
              </div>
            </div>
            {eventData.events.map((event, index) => {
              return (
                <div key={index} className={`row ${Styles.venueWrapper}`}>
                  <div className="col">{event.venue.name}</div>
                  <div className="col">{event.venue.city}</div>
                  <div className="col">{event.venue.country}</div>
                  <div className="col">
                    {this.formatEventDate(event.datetime)}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        );
      } else {
        return <p className="text-danger">No events scheduled yet</p>;
      }
    }
  };

  render() {
    const { loaderFlag, artistDetails, errorMessage } = this.props;
    return (
      <React.Fragment>
        <h1 className={`text-primary ${Styles.home24Heading}`}>
          Artist Events
        </h1>
        <div className="row">
          <div className="col-sm-5">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter artist name"
                value={this.state.artistName}
                onChange={e => this.artistName(e)}
                maxLength={50}
              />
            </div>
          </div>
          <div className="col-sm-1">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.getEventDetail()}
              disabled={!this.state.artistName.trim().length}
            >
              search
            </button>
          </div>
          <div className="col">
            {loaderFlag && <div className={Styles.loader} />}
          </div>
        </div>

        {errorMessage.length ? (
          <p className="text-danger">{errorMessage}</p>
        ) : (
          ""
        )}
        <div className={Styles.profileWrapper}>
          {artistDetails.image_url && <img src={artistDetails.image_url} alt='' />}
          <span className={Styles.artistName}>{artistDetails.name}</span>
          {artistDetails.facebook_page_url && (
            <a href={artistDetails.facebook_page_url}>
              Facebook URL
            </a>
          )}
        </div>

        {this.renderEvents(artistDetails)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { artist } = state;
  return {
    loaderFlag: artist.loaderFlag || false,
    artistDetails: artist.artistDetails || {},
    errorMessage: artist.errorMessage || ""
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showLoader: () => {
      dispatch(showLoader());
    },
    getArtistDetail: name => {
      dispatch(getArtistDetail(name));
    }
  };
};

export default connect( // connect HOC
  mapStateToProps,
  mapDispatchToProps
)(Artist);
