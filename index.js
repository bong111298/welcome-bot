const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});


// READY
client.on('ready', () => {
  console.log(`🔥 READY: ${client.user.tag}`);
});

// MEMBER JOIN
client.on('guildMemberAdd', async (member) => {
  console.log("🔥 MEMBER JOIN:", member.user.username);

  try {
    const channel = member.guild.channels.cache.get("1313433615853420575");
    if (!channel) return console.log("❌ Không tìm thấy channel");

    // ===== CANVAS =====
    const canvas = Canvas.createCanvas(1200, 500);
    const ctx = canvas.getContext('2d');

    // ===== BACKGROUND =====
    const bg = await Canvas.loadImage('./background.png');
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    // ===== AVATAR =====
    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ extension: 'png', size: 512 })
    );

    const x = 300;
    const y = 250;
    const r = 110;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatar, x - r, y - r, r * 2, r * 2);
    ctx.restore();

    // ===== USERNAME =====
    ctx.font = "bold 60px Arial"; // ✅ dùng Arial cho chắc
    ctx.fillStyle = "#ff2e2e";
    ctx.textAlign = "center";

    // ===== USERNAME STYLE GTA =====
ctx.textAlign = "center";

// font chiến
ctx.font = "bold 48px Impact";

// gradient đỏ -> cam
const gradient = ctx.createLinearGradient(x - 150, 0, x + 150, 0);
gradient.addColorStop(0, "#ff0000");
gradient.addColorStop(1, "#ff7300");

ctx.fillStyle = gradient;

// glow
ctx.shadowColor = "#ff0000";
ctx.shadowBlur = 20;

// vẽ chữ
ctx.fillText(member.user.username.toUpperCase(), x, y + r + 50);

// viền chữ (rất quan trọng để nét)
ctx.lineWidth = 3;
ctx.strokeStyle = "#000";
ctx.strokeText(member.user.username.toUpperCase(), x, y + r + 50);

// reset
ctx.shadowBlur = 0;
// ===== NEON BORDER =====
ctx.beginPath();
ctx.arc(x, y, r + 5, 0, Math.PI * 2);
ctx.strokeStyle = "#ff2e2e";
ctx.lineWidth = 5;

ctx.shadowColor = "#ff0000";
ctx.shadowBlur = 25;

ctx.stroke();

ctx.shadowBlur = 0;

    // ===== EXPORT =====
    const attachment = new AttachmentBuilder(canvas.toBuffer(), {
      name: 'welcome.png'
    });

    // ===== SEND =====
    channel.send({
      content: `👋 Chào mừng <@${member.id}> đến với server!`,
      files: [attachment]
    });

  } catch (err) {
    console.log("❌ LỖI:", err);
  }
});

client.login(process.env.TOKEN);
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(3000, () => {
  console.log("Web server running");
});