<!-- Improved compatibility of back to top link: See: https://github.com/dnvr-zero/dnvr-zero/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the DNVRzero project! If you have a suggestion
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

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h1 align="center">DNVR Zero</h1>

  <p align="center">
    <h3>DNVRzero (or Dnvr0) is a modernization of the wildly successful <strong><a href="http://sf0.org">SF0.org</a></strong></h3>
    <p>The idea is simple, really: create a user, complete tasks, gain points, level up</p>
    <p>The fun comes from the users, and the tasks they invent, and how tasks are interpreted and completed</p>
    <p> None of this really means anything, so why not have some fun while doing it?</p>
    <br />
    <figure>
  <img src="https://github.com/dnvr-zero/dnvr-zero-be/raw/main/public/dnvrzero.jpg" alt="Logo">
  <figcaption>
    <span class="caption"> Thanks <a href="https://unsplash.com/license">Unsplash!</a></span> |
    <i class=""> Photo by <a href="https://unsplash.com/@planner1963">Pietr Van de Sande</a> </i>
  </figcaption>
  </figure>
    <br />
    <a href="http://sf0.org/"><strong>Visit the original website that is the inspiration for this project »</strong></a>
    <br />
    <br />
    <a href="https://github.com/dnvr-zero/dnvr-zero-be">View Backend source code</a>
    ·
    <a href="https://github.com/dnvr-zero/dnvr-zero-fe">View Frontend source code</a>
    .
    <a href="https://github.com/dnvr-zero/dnvr-zero-be/issues">Report Bug</a>
    ·
    <a href="https://github.com/dnvr-zero/dnvr-zero-be/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

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
    <li><a href="#wireframes">Wireframes</a></li>
    <li><a href="#schema">Schema</a></li>
    <li><a href="#json-contracts">JSON contracts</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>


<!-- ABOUT THE PROJECT -->

## About The Project

We're alumni of the Turing School of Software and Design, and this project is part of the New Grad Services program, which provides opportunity for recent grads to continue to practice existing skills, gain new tech stack, and build community around an open source project.

<details>
<summary>Click for more</summary>
<p>We're (re)creating (or re-vitalizing) a site that encourages non-consumer leisure activities, creativity and exploring the habitat in which you find yourself. Create a "player", find a task to complete, and then sign up for that task. Submit proof once you're done and gain sweet, sweet fake internet points to level up.</p>

<p>If you'd rather invent tasks for people to complete, do that too! Date ideas? Solo dates? Artist's date? Looking for a cure for your boredom? Want to meet people and explore your city? Want to do something fun with a loved one? Want to break the monotony of the same ol' routine? What are you waiting for?</p>

<p>Collaborate with your friends! Collaborate with strangers! Or just complete these on your own.
</p>
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

-   [![MongoDB][MongoDB]][mongo-url]
-   [![Express][Express]][express-url]
-   [![React][react]][react-url]
-   [![Node][Node]][node-url]
-   [![TypeScript][TypeScript]][typescript-url]
-   [![Bootstrap][Bootstrap]][bootstrap-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Must have Node and NPM on your machine

### Installation

- Depending on which branch you're looking to work on, navigate the either the frontend or backend repository
- fork the repository
- clone your fork onto your local machine
- cd into the new repo
- install the necessary packages with

```
> npm install
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Wireframes -->

## Wireframes

### LogIn Page Wireframe
<img src="https://github.com/dnvr-zero/dnvr-zero-be/raw/main/public/loginPageWireFrame.png" alt="Logo">

### Main Page Wireframe
<img src="https://github.com/dnvr-zero/dnvr-zero-be/raw/main/public/mainPageWireFrame.png" alt="Logo">

### Player Profile Wireframe
<img src="https://github.com/dnvr-zero/dnvr-zero-be/raw/main/public/playerProfileWireFrame.png" alt="Logo">

### Task Details Wireframe
<img src="https://github.com/dnvr-zero/dnvr-zero-be/raw/main/public/taskDetailsWireFrame.png" alt="Logo">

### Task Holder Wireframe
<img src="https://github.com/dnvr-zero/dnvr-zero-be/raw/main/public/taskHolderWireFrame.png" alt="Logo">

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Schema -->

## Schema

<img src="https://github.com/dnvr-zero/dnvr-zero-be/raw/main/public/dnvr-zero-schema.jpeg" alt="Logo">


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- JSON contracts -->

## JSON contracts

The backend repository is using Swagger to help document the endpoints.

Once the backend repo has been forked, cloned and packages have been installed, run the following command to start the development environment:

```
> npm run start:dev
```

now navigate to `localhost:8000/apidocs` and you'll see the Swagger UI

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

  This project will be live; Locating the live site will be listed here, when available

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

   This project is managed via the organization project board, which can be found [here](https://github.com/orgs/dnvr-zero/projects/2)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the respective repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the specific organization repo (frontend or backend)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Contributors -->

## Contributors

### FRONTEND
<table>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/97558758?s=150&v=4"></td>
    <td><img src="https://avatars.githubusercontent.com/u/28677929?s=150&v=4"></td>
  </tr>
  <tr>
    <td>Jordan Farelli</td>
    <td>Ali Nix</td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/dnvr-zero/dnvr-zero-be/raw/main/public/github-logo.png" alt="github"> <a href="https://github.com/jfarelli">GitHub</a><br>
      <img src="https://github.com/dnvr-zero/dnvr-zero-be/raw/main/public/linkedin-logo.png" alt="linkedin"> <a href="https://www.linkedin.com/in/jordan-farelli/">LinkedIn</a>
    </td>
    <td>
      <img src="https://github.com/dnvr-zero/dnvr-zero-be/raw/main/public/github-logo.png" alt="github"> <a href="https://github.com/alinix1">GitHub</a><br>
      <img src="https://github.com/dnvr-zero/dnvr-zero-be/raw/main/public/linkedin-logo.png" alt="linkedin"> <a href="https://www.linkedin.com/in/ali-nix-38b9b9126/">LinkedIn</a>
    </td>
  </tr>
</table>

### BACKEND
<table>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/110377741?s=150&v=4"></td>
    <td><img src="https://avatars.githubusercontent.com/u/35391349?s=150&v=4"></td>
  </tr>
  <tr>
    <td>Mostafa Sakr</td>
    <td>Michael Marchand</td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/dnvr-zero/dnvr-zero-be/raw/main/public/github-logo.png" alt="github"> <a href="https://github.com/msakr21">GitHub</a><br>
      <img src="https://github.com/dnvr-zero/dnvr-zero-be/raw/main/public/linkedin-logo.png" alt="linkedin"> <a href="https://www.linkedin.com/in/mostafasakr16/">LinkedIn</a>
    </td>
    <td>
      <img src="https://github.com/dnvr-zero/dnvr-zero-be/raw/main/public/github-logo.png" alt="github"> <a href="https://github.com/marchandMD">GitHub</a><br>
      <img src="https://github.com/dnvr-zero/dnvr-zero-be/raw/main/public/linkedin-logo.png" alt="linkedin"> <a href="https://www.linkedin.com/in/mmarchand1/">LinkedIn</a>
    </td>
  </tr>
</table>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Some great tools and/or people who helped to make this project what it is!

-   [Choose an Open Source License](https://choosealicense.com)
-   [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
-   [Img Shields](https://shields.io)
-   [Unsplash](https://unsplash.com/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/dnvr-zero/dnvr-zero-be.svg?style=for-the-badge
[contributors-url]: https://github.com/dnvr-zero/dnvr-zero-be/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/dnvr-zero/dnvr-zero.svg?style=for-the-badge
[forks-url]: https://github.com/dnvr-zero/dnvr-zero-be/network/members
[stars-shield]: https://img.shields.io/github/stars/dnvr-zero/dnvr-zero-be.svg?style=for-the-badge
[stars-url]: https://github.com/dnvr-zero/dnvr-zero-be/stargazers
[issues-shield]: https://img.shields.io/github/issues/dnvr-zero/dnvr-zero-be.svg?style=for-the-badge
[issues-url]: https://github.com/dnvr-zero/dnvr-zero-be/issues
[license-shield]: https://img.shields.io/github/license/dnvr-zero/dnvr-zero-be.svg?style=for-the-badge
[license-url]: https://github.com/dnvr-zero/dnvr-zero-be/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/mmarchand1/
[product-screenshot]: images/screenshot.png
[Bootstrap]: https://img.shields.io/badge/Bootstrap-v5.3.0-success
[bootstrap-url]: https://getbootstrap.com
[ruby.com]: https://img.shields.io/badge/ruby-v2.7.4-red
[ruby-url]: https://ruby-doc.org/core-2.7.2/
[rspec.com]: https://img.shields.io/badge/rspec-v3.12-success
[rspec-url]: https://rspec.info/documentation/
[MongoDB]: https://img.shields.io/badge/mongoDB-v5.6-success
[mongo-url]: https://www.mongodb.com/
[Express]: https://img.shields.io/badge/Express-v4.18-success
[express-url]: https://expressjs.com/
[React]: https://img.shields.io/badge/React-v18.2-success
[react-url]: https://react.dev/
[Node]: https://img.shields.io/badge/Node-v19.7.0-success
[node-url]: https://nodejs.dev/en/
[TypeScript]: https://img.shields.io/badge/TypeScript-v4.9.5-success
[typescript-url]: https://react.dev/