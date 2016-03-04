import React, { Component, PropTypes } from 'react';
import {
  Assets,
  includeRoute,
  includeRoutes,
} from 'nucleate';

export const getIndexRoute = includeRoute(require('route!./pages/'));
export const getChildRoutes = includeRoutes(require.context('route!./pages/', false));

export class component extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;

    return (
      <html>
        <head>
          <title>Blog</title>
          {
            Assets() // eslint-disable-line new-cap
          }
        </head>
        <body>
          {children}
        </body>
      </html>
    );
  }
};

// ({
//   path: '/',
//   component: 'index.jsx',
//   indexRoute: { component: 'pages/index.jsx' },
//   childRoutes: [
//     { path: '/about', component: 'pages/about.md' },
//     { path: '/projects', component: 'pages/projects.jsx' },
//     {
//       path: '/posts',
//       component: Children,
//       indexRoute: { component: 'pages/posts/index.jsx' },
//       childRoutes: [
//         { path: '/posts/post1', component: 'pages/posts/post1.md' },
//         { path: '/posts/post2', component: 'pages/posts/post2.jsx' },
//         { path: '/posts/post3', component: 'pages/posts/post3.jsx' },
//       ],
//     },
//   ],
// });
