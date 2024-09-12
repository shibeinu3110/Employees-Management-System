import React, { Component, Fragment } from "react";
import ConstantList from "../../appConfig";
import {
  Grid,
  IconButton,
  Icon,
  Card,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { Breadcrumb, SimpleCard, CardWidget1 } from "egret";
import DoughnutChart from "../charts/echarts/Doughnut";
import ComparisonChart from "../charts/echarts/ComparisonChart";
import { withStyles } from "@material-ui/styles";

class Sales extends Component {
  state = {};
  productList = [
    {
      imgUrl: ConstantList.ROOT_PATH+"assets/images/products/headphone-2.jpg",
      name: "earphone",
      price: 100,
      available: 15
    },
    {
      imgUrl: ConstantList.ROOT_PATH+"assets/images/products/headphone-3.jpg",
      name: "earphone",
      price: 1500,
      available: 30
    },
    {
      imgUrl: ConstantList.ROOT_PATH+"assets/images/products/sq-11.jpg",
      name: "bulb",
      price: 1900,
      available: 35
    },
    {
      imgUrl: ConstantList.ROOT_PATH+"assets/images/products/iphone-1.jpg",
      name: "pen",
      price: 100,
      available: 0
    },
    {
      imgUrl: ConstantList.ROOT_PATH+"assets/images/products/headphone-3.jpg",
      name: "Head phone",
      price: 1190,
      available: 5
    }
  ];

  paymentList = [
    {
      img: ConstantList.ROOT_PATH+"assets/images/payment-methods/master-card.png",
      type: "Master Card 2",
      product: "Bundled product",
      amount: 909
    },
    {
      img: ConstantList.ROOT_PATH+"assets/images/payment-methods/paypal.png",
      type: "Paypal",
      product: "Bundled product",
      amount: 303
    },
    {
      img: ConstantList.ROOT_PATH+"assets/images/payment-methods/visa.png",
      type: "Visa",
      product: "Bundled product",
      amount: 330
    },
    {
      img: ConstantList.ROOT_PATH+"assets/images/payment-methods/maestro.png",
      type: "Maestro",
      product: "Bundled product",
      amount: 909
    },
    {
      img: ConstantList.ROOT_PATH+"assets/images/payment-methods/maestro.png",
      type: "Master Card 3",
      product: "Bundled product",
      amount: 909
    }
  ];

  render() {
    let { theme } = this.props;
    return (
      <div className="sales m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Dashboard", path: "/dashboard" },
              { name: "Sales" }
            ]}
          />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <CardWidget1 backgroundClass="bg-circle-primary" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardWidget1 backgroundClass="bg-circle-warn" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardWidget1 backgroundClass="bg-circle-secondary" />
          </Grid>

          {/* update starts from here */}
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card className="bills h-100" elevation={3}>
              {this.paymentList.map((method, index) => (
                <Fragment key={index}>
                  <div className="py-16 px-24 flex flex-wrap flex-middle flex-space-between">
                    <div className="flex flex-wrap flex-middle">
                      <div className="bills__icon flex flex-middle flex-center">
                        <img src={method.img} alt="master card" />
                      </div>
                      <div className="ml-16">
                        <p className="m-0">{method.type}</p>
                        <span className="text-small text-muted">
                          {method.product}
                        </span>
                      </div>
                    </div>
                    <span className="m-0 text-muted font-size-18">
                      ${method.amount}
                    </span>
                  </div>
                  {index !== this.paymentList.length - 1 && <Divider />}
                </Fragment>
              ))}
            </Card>
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <SimpleCard title="website vs app" subtitle="Last 6 months">
              <ComparisonChart
                height="350px"
                color={[
                  theme.palette.primary.main,
                  theme.palette.primary.light
                ]}
              />
            </SimpleCard>
          </Grid>

          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Card elevation={3} className="pt-20">
              <div className="card-title px-24 mb-12">top selling products</div>
              <div className="overflow-auto">
                <Table className="product-table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="px-24" colSpan={4}>
                        Name
                      </TableCell>
                      <TableCell className="px-0" colSpan={2}>
                        Revenue
                      </TableCell>
                      <TableCell className="px-0" colSpan={2}>
                        Stock Status
                      </TableCell>
                      <TableCell className="px-0" colSpan={1}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.productList.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell
                          className="px-0 capitalize"
                          colSpan={4}
                          align="left"
                        >
                          <div className="flex flex-middle">
                            <img
                              className="circular-image-small"
                              src={product.imgUrl}
                              alt="user"
                            />
                            <p className="m-0 ml-8">{product.name}</p>
                          </div>
                        </TableCell>
                        <TableCell
                          className="px-0 capitalize"
                          align="left"
                          colSpan={2}
                        >
                          $
                          {product.price > 999
                            ? (product.price / 1000).toFixed(1) + "k"
                            : product.price}
                        </TableCell>

                        <TableCell className="px-0" align="left" colSpan={2}>
                          {product.available ? (
                            product.available < 20 ? (
                              <small className="border-radius-4 bg-secondary text-white px-8 py-2 ">
                                {product.available} available
                              </small>
                            ) : (
                              <small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                                in stock
                              </small>
                            )
                          ) : (
                            <small className="border-radius-4 bg-error text-white px-8 py-2 ">
                              out of stock
                            </small>
                          )}
                        </TableCell>
                        <TableCell className="px-0" colSpan={1}>
                          <IconButton>
                            <Icon color="primary">edit</Icon>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <SimpleCard title="Traffic Sources" subtitle="Last 30 days">
              <DoughnutChart
                height="300px"
                color={[
                  theme.palette.primary.dark,
                  theme.palette.primary.main,
                  theme.palette.primary.light
                ]}
              />
            </SimpleCard>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles({}, { withTheme: true })(Sales);
