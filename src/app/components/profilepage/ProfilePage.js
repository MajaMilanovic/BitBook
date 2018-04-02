import React, { Fragment } from "react";
import { profilePage } from "./profilePage.css";
import { profileService } from "../../../services/ProfileService";
import { ProfileCard } from "./ProfileCard";


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null
        }
    }


    componentDidMount() {
        profileService.fetchProfile()
            .then(response => {
                this.setState({ profile: response })
            })
    }

  
    render() {
        const { profile } = this.state;
        return (
            <Fragment>
                {(!profile) ?<h1>...</h1>:< ProfileCard profile={profile} />}
            </Fragment>

        )

    }
}
export { ProfilePage }