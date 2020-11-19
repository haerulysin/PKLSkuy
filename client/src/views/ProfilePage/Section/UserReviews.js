import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    Typography,
    Grid,
    Card,
    CardContent
} from '@material-ui/core';

import Pagination from '@material-ui/lab/Pagination';
import ReviewCardContent from './SubComponents/ReviewCardContent';

//redux
import { getUserReview } from '../../../redux/actions/userActions';
import { connect } from 'react-redux';


class UserReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userReviewData: [],
            pageData: 1
        }
    }

    NoReviews() {
        return (
            <div style={{ textAlign: "center" }}>
                <img
                    src={require("../../../assets/img/noreviewspict.png")}
                    width="300px"
                    alt="noReviews"
                />
                <br />
                <Typography variant="h5" color="primary">Tidak ada ulasan terlihat di sini!</Typography>
            </div>
        );
    }

    static getDerivedStateFromProps(props, state) {
        if (props.userState.userReviewData) {
            return {
                userReviewData: props.userState.userReviewData
            }
        }

        return null;
    }
    componentDidMount() {
        this.props.getUserReview(this.props.userID, this.state.pageData);
    }


    handlePageChange(e, values) {
        this.setState({ pageData: values });
        this.props.getUserReview(this.props.userID, values);
    }

    render() {
        console.log(this.state.userReviewData)

        if (!this.state.userReviewData.status) {
            return (
                <p>Loading</p>
            );
        }


        const { userReviewData } = this.state;
        const pageSize = (parseInt(userReviewData.total / 5) + 1);
        return (
            <Grid container style={{ background: '#fff' }}>
                <Grid item xs={12}>
                    <div style={{ padding: '10px 16px' }}>
                        <Typography variant="h4">Reviews</Typography>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="caption" style={{ color: "#555" }}>Menampilkan {userReviewData.data.length} dari {userReviewData.total} reviews</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    {this.state.userReviewData.total === 0 ?
                                        <this.NoReviews />
                                        :
                                        this.state.userReviewData.data.map((item, index) => (
                                            <ReviewCardContent
                                                key={index}
                                                {...item}

                                            />
                                        ))

                                    }
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                {pageSize > 0 &&
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                        <Pagination
                            count={pageSize}
                            variant="outlined"
                            shape="rounded"
                            onChange={this.handlePageChange.bind(this)}
                            showFirstButton
                            showLastButton
                        />
                    </Grid>
                }

            </Grid>
        );
    }
}

UserReviews.propTypes = {
    errors: PropTypes.object.isRequired,
    userState: PropTypes.object.isRequired,
    getUserReview: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    userState: state.userState,
});

export default connect(
    mapStateToProps,
    { getUserReview }

)(UserReviews);