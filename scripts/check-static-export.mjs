console.error(
  "This version includes private inquiry storage and administrator APIs. Static-only export would silently remove these features. Deploy with Node 24 and a persistent KZ_DATA_DIR; see DEPLOYMENT.md.",
);
process.exit(1);
