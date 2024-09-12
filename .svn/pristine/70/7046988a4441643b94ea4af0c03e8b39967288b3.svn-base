import React, { Component } from "react";
import {
  Card,
  MenuItem,
  Divider,
  IconButton,
  Icon,
  Hidden
} from "@material-ui/core";
import {
  EgretSidenavContainer,
  EgretSidenav,
  EgretSidenavContent
} from "egret";

class LeftSidebarCard extends Component {
  state = { open: true };

  toggleSidenav = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    return (
      <div className="left-sidenav-card">
        <div className="header-bg" />
        <div className="left-sidenav-card__content">
          <EgretSidenavContainer>
            <EgretSidenav
              width="320px"
              bgClass="bg-transperant"
              open={this.state.open}
              toggleSidenav={this.toggleSidenav}
            >
              <div className="left-sidenav-card__sidenav">
                <Hidden smUp>
                  <div className="flex flex-end">
                    <IconButton onClick={this.toggleSidenav}>
                      <Icon>clear</Icon>
                    </IconButton>
                  </div>
                </Hidden>
                <h6 className="sidenav__header pl-36 pt-24">Sidebar header</h6>
                <div className="py-80" />
                <div className="bg-default">
                  <MenuItem className="pl-32">List 1</MenuItem>
                  <MenuItem className="pl-32">List 1</MenuItem>
                  <MenuItem className="pl-32">List 1</MenuItem>
                  <MenuItem className="pl-32">List 1</MenuItem>
                  <MenuItem className="pl-32">List 1</MenuItem>
                  <MenuItem className="pl-32">List 1</MenuItem>
                  <MenuItem className="pl-32">List 1</MenuItem>
                </div>
              </div>
            </EgretSidenav>
            <EgretSidenavContent>
              <h5 className="text-white pl-24 pt-24">Left sidebar card</h5>
              <div className="py-40" />
              <div className="pb-2" />
              <Card className="content-card m-4" elevation={2}>
                <div className="card-header flex flex-wrap flex-middle ml-8">
                  <div className="show-on-mobile">
                    <IconButton onClick={this.toggleSidenav}>
                      <Icon>short_text</Icon>
                    </IconButton>
                  </div>
                  <div className="hide-on-mobile">
                    <div className="pl-16"></div>
                  </div>
                  <div>Card toolbar</div>
                </div>
                <Divider />
                <p className="white-space-pre-line p-24 m-0">
                  {`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima sapiente earum aspernatur quia officia eaque beatae rem molestiae fuga tempora, architecto doloremque facilis, illum, soluta ducimus dolorum tempore nemo inventore! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima sapiente earum aspernatur quia officia eaque beatae rem molestiae fuga tempora, architecto doloremque facilis, illum, soluta ducimus dolorum tempore nemo inventore! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima sapiente earum aspernatur quia officia eaque beatae rem molestiae fuga tempora, architecto doloremque facilis, illum, soluta ducimus dolorum tempore nemo inventore! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima sapiente earum aspernatur quia officia eaque beatae rem molestiae fuga tempora, architecto doloremque facilis, illum, soluta ducimus dolorum tempore nemo inventore! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima sapiente earum aspernatur quia officia eaque beatae rem molestiae fuga tempora, architecto doloremque facilis, illum, soluta ducimus dolorum tempore nemo inventore!
Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi omnis consequuntur sint quos deleniti, accusantium iusto earum quia pariatur, quasi ea expedita fuga libero! Porro nisi dicta nemo laudantium.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi omnis consequuntur sint quos deleniti, accusantium iusto earum quia pariatur, quasi ea expedita fuga libero! Porro nisi dicta nemo laudantium.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi omnis consequuntur sint quos deleniti, accusantium iusto earum quia pariatur, quasi ea expedita fuga libero! Porro nisi dicta nemo laudantium.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi omnis consequuntur sint quos deleniti, accusantium iusto earum quia pariatur, quasi ea expedita fuga libero! Porro nisi dicta nemo laudantium.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi omnis consequuntur sint quos deleniti, accusantium iusto earum quia pariatur, quasi ea expedita fuga libero! Porro nisi dicta nemo laudantium.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi omnis consequuntur sint quos deleniti, accusantium iusto earum quia pariatur, quasi ea expedita fuga libero! Porro nisi dicta nemo laudantium.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi omnis consequuntur sint quos deleniti, accusantium iusto earum quia pariatur, quasi ea expedita fuga libero! Porro nisi dicta nemo laudantium.`}
                </p>
              </Card>
            </EgretSidenavContent>
          </EgretSidenavContainer>
        </div>
      </div>
    );
  }
}

export default LeftSidebarCard;
