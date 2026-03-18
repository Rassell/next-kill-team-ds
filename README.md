# Kill Team Dataslate Tracker

Web that tracks historical Kill Team Dataslate releases and predicts the next release date based on the average time between publications. 

## 🚀 Getting Started

### Prerequisites

- Node.js 22+ 
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rassell/next-kill-team-ds.git
cd next-kill-team-ds
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5174/next-kill-team-ds/](http://localhost:5174/next-kill-team-ds/) in your browser

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📝 Updating Dataslate Data

To add new Dataslate releases or update existing ones:

1. Open `public/data.json`
2. Add a new entry to the array following this format:

```json
{
  "title": "Kill Team Q2 2026 Dataslate",
  "link": "https://www.warhammer-community.com/...",
  "publishedDate": "2026-04-15"
}
```

**Important**: Use ISO 8601 date format (`YYYY-MM-DD`) for the `publishedDate` field.

3. Save the file and commit your changes
4. The site will automatically recalculate predictions based on the new data
5. Push to GitHub and the site will auto-deploy

## 🤝 Contributing

This is a fan-made tool. Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

See [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is an unofficial fan-made tool and is not affiliated with, endorsed by, or in any way officially connected with Games Workshop, Warhammer, or Kill Team. All trademarks and copyrights belong to their respective owners.

The predictions are estimates based on historical patterns and should not be taken as official release dates.

## 🙏 Acknowledgments

- Games Workshop for Kill Team
- The Kill Team community
- All contributors to this project

---

Made with ❤️ by the Kill Team community
