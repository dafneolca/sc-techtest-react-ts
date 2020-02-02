![Logo Swapcard](./assets/logo_swapcard.svg)

# React technical test

## Introduction

The goal is to build a small app to search musical artists from this GraphQL API endpoint <https://graphbrainz.herokuapp.com>.
No authentication is required.
You should be able to locally set/unset artists as "favorites".
The project must be versioned, hosted and publicly available on a git forge.
It would be great if the project can run online ([herokuapp](https://www.heroku.com) / [netlify](https://www.netlify.com)) but it's not mandatory.

Tips for non Graphql users : 
GraphQL is a query language to communicate with an api, for example with <https://graphbrainz.herokuapp.com>, you can paste in the left column :
```
{
  search {
    artists(query: "Nirvana") {
      nodes {
        id
        name
      }
    }
  }
}
```
And press the play button to see results.

_Using GraphQL is a must, but if you can't, feel free to use another, similar REST API_


## The product you must build

- **Home page** :
  List artists depending on searches
  (
  watchout: empty searches will throw an error from the api,
  so make a UI that displays an empty view when there is no search
  and the results list when the search is filled
  )
- **Artist details page** :
  display informations of the selected artist and a small list of some of the artist's releases.
  From this view, the user must be able to set/unset an artist as a favorite.
- **Layout** (displayed on both pages) :
  - Add a way to go back from a details to the list (breadcrumb, menu, buttons, etc...).
  - Sidebar : To contain your "favorite" artists.

## Nice to have

This part is not mandatory,
it's only some suggestions to improve your test.
Of course, you can add other parts that you see fit.

- Debounce your search to prevent api flood.
- Add a toast `{{artist}} has been added to your favorites`.
- Create another subpage for Artist's albums (Artist -> Album -> Details).
- Give a try to an SSR (Server Side Rendering) first initial render.
- Infinite scrolling in the artists list.

## Some tools you could use

- React (mandatory)
- For handling data fetching,
  you can work with `react-apollo`, `react-relay`
  or your own implementation of fetch using graphql.
- For handling local data (user "favorite" artists),
  you can work with redux, react context, localStorage, apollo local schema, etc...
- You can type your code using typescript or flow
- You can bootstrap your app using react-create-app
- For styling, use any framework / library you want
  (styled-component, grommet, material, ...)
- if you're aware of this, you can use React Hooks



## TODO:

1. Bugfix: Routes from sidebar not rendering the correct component / sidebar not sending correct data to FullArtistProfile
2. Bugfix: Favorites do not store favorite variable on FullArtistProfile component
