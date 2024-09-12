import React from "react";
import { Card, Grid, Button } from "@material-ui/core";
import ConstantList from "../../appConfig";
const Pricing = () => {
  return (
    <div className="pricing m-sm-30 position-relative">
      <Card className="p-24 mb-44 bg-light-error box-shadow-none">
        <h5 className="m-0 mb-8 font-weight-500 text-error">
          You are using the free version of the Application
        </h5>
        <p className="m-0 text-muted" style={{ maxWidth: "771px" }}>
          With 10k searchable messages, 10 apps and integrations, 1-to-1 video
          calls and two factor authentication. The free version gives your team
          access to Application's basic features
        </p>
      </Card>

      <div className="w-100 text-center mb-44">
        <h3 className="m-0 font-weight-500">
          Choose the plan that's right for your team
        </h3>
        <p className="m-0 pt-16 text-muted">
          Pay month or year and cancel at any time
        </p>
      </div>

      <div>
        <Grid container spacing={6}>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <Card elevation={6} className="pricing__card text-center p-sm-24">
              <img
                className="mb-16"
                src={ConstantList.ROOT_PATH+"assets/images/illustrations/baby.svg"}
                alt="upgrade"
              />
              <div className="mb-16">
                <h5>Starter</h5>
                <h1>$75</h1>
                <small className="text-muted">Monthly</small>
              </div>

              <div className="mb-24">
                <p className="mt-0">Complete CRM service</p>
                <p>100GB disk space</p>
                <p className="mb-0">upto 5 users</p>
              </div>

              <Button variant="contained" color="primary" className="uppercase">
                Sign up
              </Button>
            </Card>
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <Card elevation={6} className="pricing__card text-center p-sm-24">
              <img
                className="mb-16"
                src={ConstantList.ROOT_PATH+"assets/images/illustrations/upgrade.svg"}
                alt="upgrade"
              />
              <div className="mb-16">
                <h5>Growing</h5>
                <h1>$195</h1>
                <small className="text-muted">Monthly</small>
              </div>

              <div className="mb-24">
                <p className="mt-0">Complete CRM service</p>
                <p>10000GB disk space</p>
                <p className="mb-0">upto 15 users</p>
              </div>

              <Button variant="contained" color="primary" className="uppercase">
                Sign up
              </Button>
            </Card>
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <Card elevation={6} className="pricing__card text-center p-sm-24">
              <img
                className="mb-16"
                src={ConstantList.ROOT_PATH+"assets/images/illustrations/business_deal.svg"}
                alt="upgrade"
              />
              <div className="mb-16">
                <h5>Enterprise</h5>
                <h1>$495</h1>
                <small className="text-muted">Monthly</small>
              </div>

              <div className="mb-24">
                <p className="mt-0">Complete CRM service</p>
                <p>10TB disk space</p>
                <p className="mb-0">upto 100 users</p>
              </div>

              <Button variant="contained" color="primary" className="uppercase">
                Sign up
              </Button>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Pricing;
