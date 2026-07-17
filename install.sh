#!/usr/bin/env bash
set -euo pipefail

REPO="officialnullobjectweb/vibecraft"
BRANCH="main"
INSTALL_DIR="${HOME}/.vibecraft"

echo ""
echo "  VibeCraft — Living Design OS"
echo "  Installing to ${INSTALL_DIR}"
echo ""

# Clean previous install if any
rm -rf "$INSTALL_DIR"

# Download
TARBALL="https://github.com/${REPO}/archive/refs/heads/${BRANCH}.tar.gz"
echo "  Downloading..."
curl -fsSL "$TARBALL" | tar xz -C /tmp
mv "/tmp/vibecraft-${BRANCH}" "$INSTALL_DIR"

# Install deps
echo "  Installing dependencies..."
cd "$INSTALL_DIR" && npm install --silent

# Link globally
echo "  Linking command..."
LINK_DIR="${HOME}/.local/bin"
mkdir -p "$LINK_DIR"
ln -sf "${INSTALL_DIR}/bin/vibecraft.js" "${LINK_DIR}/vibecraft"
chmod +x "${INSTALL_DIR}/bin/vibecraft.js"

# Add to PATH if needed
if [[ ":$PATH:" != *":${LINK_DIR}:"* ]]; then
  SHELL_CONFIG="${HOME}/.$(basename "$SHELL")rc"
  echo "export PATH=\"\${HOME}/.local/bin:\${PATH}\"" >> "$SHELL_CONFIG"
  echo "  Added ${LINK_DIR} to PATH in ${SHELL_CONFIG}"
  echo "  Restart your terminal or run: export PATH=\"${HOME}/.local/bin:\${PATH}\""
fi

echo ""
echo "  Done! Run: vibecraft init"
echo ""
