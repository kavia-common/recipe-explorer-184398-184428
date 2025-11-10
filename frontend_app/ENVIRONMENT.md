Recipe Explorer Environment Notes

Available variables (read-only here; set them in your deployment .env):
- NG_APP_API_BASE: Optional base URL for a future REST backend. If undefined or empty, the app uses local mock data.

Behavior:
- When NG_APP_API_BASE is set, the code structure allows swapping the data source to HTTP in RecipeService.
- Favorites persist in localStorage under key rx_favorites_v1.

No other environment vars are consumed by the Angular app at the moment.
