## Key Technologies

-   [React](https://react.dev/) - A Javascript framework for creating user interfaces.
-   [Next.js](https://nextjs.org/docs) - React-powered meta framework. One of the recommended ways to bootstrap a new react application from the react documentation.
-   [Radix ui](https://www.radix-ui.com/) - An open source component library optimized for fast development, easy maintenance, and accessibility.
-   [Shadcn](https://ui.shadcn.com/) - Beautifully designed components that you can copy and paste into your apps. Easily customizable and great for quick bootstraping and prototyping. Uses radix under the hood.
-   [Tailwindcss](https://tailwindcss.com/) - A utility-first CSS framework for styling your web applications. Easily customizable and can be adjusted to fit your brand or design system. great for quick bootstraping and prototyping.
-   [Recharts](https://recharts.org/en-US) - Highly composable charting library built on React components. Easy chart integration into your React application.
-   [Moment.js](https://momentjs.com/) - Javascript date lib for easy date manipulation and formatting.
-   [Tanstack Table](https://momentjs.com/) - Headless UI lib for working with tables. Provided logic & API for operations like sorting & pagination.

## Approach & Implementation

-   Inspected api endpoint data.
-   Multiple data points with same date & different times
-   Since we need to visualize data on weekly basis, transformed data from API endpoint.
-   Group the data by week, include all data points for each week, & aggregate the fuel mass and water mass for each day within the week.
-   Server side rendering. Great for applications like dashboards with data constantly changing.
-   Line chart for weekly data visualization. They're great for tracking changes overtime. Bar charts are another great alternative.
-   Added functionality where user can select week to view. Most recent week shown by default.
-   Displayed daily data in table format. Most recent days shown first.
-   Added pagination(10 items per page) since data coming from API endpoint is large.
-   Also added sorting by date on the table. Most recent date is shown by default.
-   Added some key metrics from the dataset provided.

## Nice to have

-   Backend Pagination : Utilized Tanstack table API for pagination. Ideally this should be done on the backend because calling a huge data set can cause slow application load times.
-   Testing - Add test suites. E.g the function the groups data by weeks or mocking API response test different scenarios (success, error, empty data). Using tools like Jest, RTL & MSW(Mock Service Workers).
-   More Key Metrics: Total experiments, Average fuel and water per experiment. Whole lot of metrics calculated & can provide valuable insights.
