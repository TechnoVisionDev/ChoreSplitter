<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/TechnoVisionDev/ChoreSplitter">
    <img src="public/assets/github/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ChoreSplitter!</h3>

  <p align="center">
    A web application to split chores with roomates!
    <br />
    <a href="http://ec2-3-82-193-93.compute-1.amazonaws.com:8080/ChoreSplitter"><strong>Explore this website »</strong></a>
    <br />
    <br />
    <a href="https://github.com/TechnoVisionDev/ChoreSplitter/wiki">Visit Wiki</a>
    ·
    <a href="https://github.com/TechnoVisionDev/ChoreSplitter/issues">Report Bug</a>
    ·
    <a href="https://github.com/TechnoVisionDev/ChoreSplitter/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

ChoreSplitter was designed as an easy and fun way to "gamify" the process of completing chores. 87% of all college students have one or more roomates, and often times these roomates are chosen at random by the school they attend. This means students may often get roomates that don't pull their weight around the dorm or apartmemt. With ChoreSplitter, you and your roomates can compete to complete as many chores as possible, ranking up on a public leaderboard for everyone to see. We hope it will revolutionize the way you and your roomates get chores done!

Here's why:
* Completing chores should be fun, and ChoreSplitter turns the process into a video game.
* A public leaderboard gives roomates a social incentive to pull their weight.
* You can chat with all your roomates right in the app.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

Below is a comprehensive list of the frameworks and libraries used to build ChoreSplitter.

* [EJS](https://ejs.co/)
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Mongoose](https://mongoosejs.com/docs/)
* [Connect Mongo](https://www.npmjs.com/package/connect-mongo)
* [DotEnv](https://www.npmjs.com/package/dotenv)
* [Short Unique ID](https://www.npmjs.com/package/short-unique-id)
* [Method Override](https://www.npmjs.com/package/method-override)
* [Helmet](https://www.npmjs.com/package/helmet)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy of ChoreSplitter up and running, follow these simple steps.

### Prerequisites

You must have [Node.js](https://nodejs.org/en/) installed on your machine.

### Installation

_Below are the necessary steps needed to run this project._

1. Clone the repo
   ```sh
   git clone https://github.com/TechnoVisionDev/ChoreSplitter.git
   ```
2. Create a [MongoDB](https://www.mongodb.com/) cluster and add your URI as an enviornment variable
   ```env
   DATABASE=your-mongodb-uri;
   ```
2. Add a custom secret key for user sessions as an environment variable
   ```env
   SECRET=your-secret-key;
   ```
5. (Optional) Add a custom port number as an environment variable (default is 3000)
   ```env
   PORT=your-port-number;
   ```
6. You can now run the server using node:
   ```sh
   node app.js
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the [GNU GPLv3](https://www.gnu.org/) License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Thomas Peters - [@tomm__peters](https://twitter.com/tomm__peters) - tapeters@usc.edu

Project Link: [https://github.com/TechnoVisionDev/ChoreSplitter](https://github.com/TechnoVisionDev/ChoreSplitter)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Below are some resources that have been instrumental in making this project a reality!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [Haikei](https://haikei.app/)
* [Google Fonts](https://fonts.google.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/TechnoVisionDev/ChoreSplitter.svg?style=for-the-badge
[contributors-url]: https://github.com/TechnoVisionDev/ChoreSplitter/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/TechnoVisionDev/ChoreSplitter.svg?style=for-the-badge
[forks-url]: https://github.com/TechnoVisionDev/ChoreSplitter/network/members
[stars-shield]: https://img.shields.io/github/stars/TechnoVisionDev/ChoreSplitter.svg?style=for-the-badge
[stars-url]: https://github.com/TechnoVisionDev/ChoreSplitter/stargazers
[issues-shield]: https://img.shields.io/github/issues/TechnoVisionDev/ChoreSplitter.svg?style=for-the-badge
[issues-url]: https://github.com/TechnoVisionDev/ChoreSplitter/issues
[license-shield]: https://img.shields.io/github/license/TechnoVisionDev/ChoreSplitter.svg?style=for-the-badge
[license-url]: https://github.com/TechnoVisionDev/ChoreSplitter/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/thomaspeters
[product-screenshot]: src/main/webapp/assets/github/screenshot.png
