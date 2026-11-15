/* ---------------- DATA (English) ---------------- */
window.PARTS = [
{
  id:"cpu", name:"Processor", alias:"CPU · Central Processing Unit",
  deep:["Inside that small metal square are tens of billions of transistors: microscopic switches that can only be 0 or 1. Everything a computer does, from calculating payroll in Excel to moving a character in a game, is ultimately broken down into millions of 0-and-1 operations carried out by these transistors.",
   "Modern CPUs have several cores. Each core is a brain that can work on its own. Many cores help when an application can split its work, like video rendering or compressing files. For work that can't be split, such as most games and Excel, what matters more is the speed of a single core: a combination of GHz and IPC (how much work gets done per clock tick).",
   "That's why comparing CPUs by GHz alone can mislead you. A Ryzen 5 9600X at 5.4 GHz is far faster than a 7th-gen Core i7 at 4.5 GHz, because its design is much newer. A safe way to compare: check the generation first, then the class (3/5/7/9), then look for benchmark results for the applications that will actually be used.",
   "The CPU also decides other things in a PC: which RAM type can be used (DDR4 or DDR5), how many PCIe lanes are available for the GPU and SSDs, and whether the PC needs a graphics card at all. That's why building a PC always starts with choosing the CPU."],
  where:"In the upper middle of the motherboard, locked inside the socket. It's covered by the cooler, so you usually can't see it from outside.",
  what:"The brain of the computer. Every instruction, from opening Excel to calculating physics in a game, is processed here. It's a small metal square about 4×4 cm, with hundreds of gold contact points underneath.",
  analogy:"Picture a restaurant kitchen. The CPU is the team of chefs: the more chefs (cores) and the faster their hands (GHz), the more orders get finished.",
  specs:[["Cores / Threads","Number of chefs. 6–8 cores is enough for almost everyone."],["Clock (GHz)","How fast each chef works. Example: 5.4 GHz boost."],["Cache","Tiny ultra-fast drawers inside the CPU. AMD's X3D chips have extra-large cache and are very strong for gaming."],["Generation","The leading number of the model. Ryzen 9600X = 9000 generation, newer than the 7600X."],["Suffix letters","K = can be overclocked, F = no integrated graphics, G = AMD with integrated graphics, X = AMD's faster version."]],
  names:"How to read the name: Intel used Core i3 / i5 / i7 / i9, and now uses Core Ultra 5 / 7 / 9. AMD uses Ryzen 3 / 5 / 7 / 9. 3 = entry level, 5 = mid-range, 7 = high-end, 9 = top. A Ryzen 5 is roughly on par with a Core i5 / Ultra 5.",
  more:["Video rendering, file compression, and 3D work finish faster.","You can run many heavy applications at once.","Games feel steadier (fewer frame drops) in strategy and simulation titles."],
  less:["Office work, browsing, and Zoom only use 2–4 cores. The rest sit idle.","Most games only use 6–8 cores. The money does more if it goes to the GPU.","A big CPU also needs a more expensive cooler, motherboard, and PSU."],
  tiers:[["Office / school","Core i3-14100 · Ryzen 5 8500G","Rp1.7–2.5M"],["Mid-range / gaming","Core Ultra 5 245K · Ryzen 5 9600X","Rp3–4M"],["High-end / streaming","Core Ultra 7 265K · Ryzen 7 9800X3D","Rp5.5–9M"],["Heavy workloads","Core Ultra 9 285K · Ryzen 9 9950X","Rp9–13M"]],
  tips:["The CPU and motherboard must use the same socket. Ryzen 9000 uses AM5, Core Ultra 200 uses LGA1851.","If you're not buying a graphics card, choose a CPU with integrated graphics (avoid Intel's F suffix)."],
  q:"processor ryzen 5 9600x"
},
{
  id:"cooler", name:"CPU Cooler", alias:"CPU Cooler · Heatsink + fan",
  deep:["Heat is electronics' main enemy. A modern CPU can produce 65 to 250 watts of heat, like a soldering iron, in an area the size of a postage stamp. Without a cooler, the CPU would hit its temperature limit (around 95–100 °C) within seconds.",
   "A cooler works in three steps. First, a copper plate absorbs heat from the CPU through thermal paste. Second, heatpipes (copper pipes holding a little liquid) move the heat upward very quickly: the liquid evaporates at the hot end and condenses at the cool end. Third, a large stack of aluminium fins hands the heat to the air, and the fan blows that hot air away.",
   "When cooling is poor, the CPU doesn't break right away. It protects itself by slowing down (thermal throttling). The PC then feels slow for no obvious reason, and the fans get loud. In office PCs used for years, the cause is almost always dust and dried-out thermal paste."],
  where:"Sits directly on top of the CPU, screwed to the motherboard. A tall tower whose fan usually blows air toward the case's rear fan.",
  what:"A working CPU produces heat of 100 °C or more. The cooler pulls that heat away through copper pipes (heatpipes), spreads it across aluminium fins, and the fan blows it out. Water-cooling versions (AIO) use liquid and a radiator.",
  analogy:"Like a car radiator. The engine can be powerful, but if the radiator is too small, the engine overheats and is forced to slow down.",
  specs:[["Air cooler","Tower heatsink + fan. Cheap, durable, almost never fails."],["AIO / liquid","Pump + 240/360 mm radiator. Cooler for high-end CPUs, cleaner look."],["TDP (watts)","How much heat it can remove. Must be higher than your CPU's heat output."],["Thermal paste","Grey paste between CPU and cooler that conducts heat."]],
  more:["The CPU can hold its maximum speed for longer.","Quieter, because the fans don't need to spin fast."],
  less:["Office CPUs (i3 / Ryzen 5 G) are fine with the fan that comes in the box.","An AIO has a pump that can fail, and it costs 3–5× as much as an air cooler."],
  tiers:[["Stock","Included in the box with some CPUs","Rp0"],["Single-fan tower","Thermalright Assassin X 120 · ID-Cooling SE-224","Rp200–450K"],["Dual-fan tower","Thermalright Peerless Assassin 120","Rp450–800K"],["AIO 240–360 mm","Lian Li, Arctic Liquid Freezer III","Rp1–3M"]],
  tips:["Check the cooler's height (mm) against the height limit in the case specs.","If the CPU often hits 95 °C and the PC slows down, check the cooler and thermal paste."],
  q:"cpu cooler tower"
},
{
  id:"mobo", name:"Motherboard", alias:"Mainboard · Mobo",
  deep:["A motherboard is a multi-layer circuit board (usually 6–10 copper layers) connecting every component. Each copper trace is designed with a specific length and spacing so that signals switching billions of times per second stay clean.",
   "An important part that rarely gets discussed is the VRM, the circuitry around the socket usually hidden under heatsinks. The VRM converts the PSU's 12 V into the roughly 1 V the CPU needs, at very high current. A cheap motherboard with a weak VRM can make a high-end CPU slow down because the VRM overheats.",
   "The motherboard also decides what you can upgrade later: how many RAM slots, how many M.2 slots, whether there's Wi-Fi, and whether its BIOS will get updates for the next CPU generation. For example, AMD has promised to support the AM5 socket through 2029, so an AM5 board bought today can likely take AMD CPUs for several more years."],
  where:"The large board screwed to the back wall of the case. Every other component plugs into it.",
  what:"The highways and post office of the computer. The motherboard connects the CPU, RAM, GPU, SSD, and USB ports, and distributes power from the PSU to each component. It also stores the BIOS/UEFI firmware.",
  analogy:"Like a city's road network. The buildings (components) can be great, but the roads decide how many buildings fit and how smoothly traffic flows.",
  specs:[["Socket","Must match the CPU: AM5 (AMD) or LGA1851 (latest Intel)."],["Chipset","Feature class. AMD: A620 < B650/B850 < X870. Intel: H810 < B860 < Z890."],["Size","ATX (large), Micro-ATX (medium), Mini-ITX (small)."],["RAM slots","2 or 4 slots, either DDR4 or DDR5 (they can't be mixed)."],["Ports","Number of M.2 slots and USB ports, built-in Wi-Fi, 2.5G LAN."]],
  more:["More M.2 slots and USB ports.","Stronger VRM (power delivery) for high-end CPUs.","Better Wi-Fi, Bluetooth, and audio included."],
  less:["An expensive motherboard doesn't make games faster.","For office use, the most basic chipset already has everything needed."],
  tiers:[["Basic","AMD A620 · Intel H610 / H810","Rp1.2–1.9M"],["Mid-range","AMD B650 / B850 · Intel B860","Rp2–4M"],["High-end","AMD X870 · Intel Z890","Rp4–10M"]],
  tips:["Order of choosing: CPU first, then a motherboard with the matching socket, then RAM of the type the motherboard supports.","The motherboard size must fit the case."],
  q:"motherboard b650"
},
{
  id:"ram", name:"RAM", alias:"Memory · DDR4 / DDR5",
  deep:["Why does a computer need RAM if it already has an SSD? Because the speeds are worlds apart. The CPU can fetch data from RAM in about 0.0000001 seconds, while even the fastest SSD takes about 500 times longer. Everything that's active (Windows, open apps, browser tabs, documents) is copied into RAM so the CPU can work without waiting.",
   "When RAM fills up, Windows is forced to move part of it onto the SSD (the page file). That's the moment a PC feels like it's \"hanging\": the cursor stutters and switching apps takes seconds. Adding RAM fixes this. But if RAM has never been full, adding more won't make the PC any faster at all.",
   "RAM speed (for example DDR5-6000) and dual channel also matter, especially in games and on PCs without a graphics card. Integrated graphics use system RAM as graphics memory, so an office PC with 2 sticks feels much smoother than one with 1 stick of the same total capacity.",
   "One important detail: newly installed RAM often runs at a base speed. To reach the speed on its label, the XMP (Intel) or EXPO (AMD) profile has to be enabled in the BIOS. This step is often skipped, even by shops."],
  where:"The upright sticks to the right of the CPU. Two sticks usually go in the 2nd and 4th slots.",
  what:"Temporary working memory. When you open an app, its data is copied from the SSD into RAM because RAM is thousands of times faster. Its contents disappear when the PC turns off.",
  analogy:"RAM is the desk. The SSD is the filing cabinet. The bigger the desk, the more files you can have open at once without walking back to the cabinet.",
  specs:[["Capacity (GB)","Size of the desk. 8 / 16 / 32 / 64 GB."],["Type","DDR4 (older, cheaper) or DDR5 (newer, faster). Must match the motherboard."],["Speed","DDR4-3200, DDR5-6000. Higher number = faster."],["Dual channel","2 sticks (2×8 GB) are faster than 1 stick of 16 GB, because there are two lanes."]],
  more:["Dozens of Chrome tabs, Photoshop, and a game can run together without stutter.","4K video editing, virtual machines, and local AI need 32–64 GB.","When RAM is full, Windows uses the SSD as a backup and the PC feels very slow."],
  less:["RAM doesn't make a PC faster if it's not being used. If you use 10 GB, the other 54 GB of a 64 GB kit just sits there.","For office and school, 16 GB is comfortable. For gaming, 32 GB is more than enough.","RAM prices are very high right now, so extra capacity is money wasted."],
  tiers:[["Minimum","8 GB DDR4 (1 stick)","Rp0.8–1.3M"],["Office / school","16 GB DDR4 (2×8)","Rp1.6–2.5M"],["New standard","16 GB DDR5 (2×8)","Rp2.5–4M"],["Gaming / editing","32 GB DDR5 (2×16)","Rp4.5–7M"],["Heavy work / AI","64 GB DDR5 (2×32)","Rp9–15M"]],
  note:"RAM prices in 2026 are 2–3× higher than in 2025 because of the memory chip shortage driven by AI. Prices have been easing since April 2026, but are still far above normal.",
  tips:["How to check usage: press Ctrl+Shift+Esc → Performance tab → Memory. If it's often above 85%, it's time to add more.","Always buy a pair (a 2-stick kit) so it runs in dual channel."],
  q:"ram ddr5 32gb kit"
},
{
  id:"gpu", name:"Graphics Card", alias:"GPU · VGA",
  deep:["A GPU contains thousands of small cores that do simple calculations at the same time. To draw one game frame on a 1920×1080 screen, the GPU has to work out the colour of about 2 million pixels, then repeat that 60 to 144 times per second. That kind of job suits many workers at once.",
   "A graphics card has its own memory called VRAM, which holds textures, 3D models, and images being processed. When VRAM is full, data has to come from much slower system RAM, and the game stutters even if its average FPS looks high. That's why a 16 GB card lasts longer for new games than an 8 GB card in the same class.",
   "Besides games, GPUs accelerate video editing (encode/decode), 3D rendering, CAD, and AI. NVIDIA leads in professional software and AI thanks to its CUDA ecosystem. AMD often gives more gaming performance per rupiah. Intel Arc is a budget option that keeps improving.",
   "Reading a GPU name: chip brand (NVIDIA GeForce RTX), generation (50), class (60/70/80/90), then variant (Ti, Super). Card brands like ASUS, MSI, Gigabyte, Zotac, and Palit build cards from the same chip with different coolers. Performance differences are small; temperatures, noise, and warranty are what differ."],
  where:"A long card plugged into the PCIe slot below the CPU. Its fans face down, and the monitor cable plugs into its end at the back of the case.",
  what:"A processor dedicated to graphics. A CPU has a few very smart chefs; a GPU has thousands of simple chefs doing small tasks at once. That's ideal for drawing millions of pixels per second, editing video, and running AI.",
  analogy:"The CPU is 8 maths professors. The GPU is 5,000 primary-school kids, each solving one addition problem. To colour in a giant picture, the 5,000 kids are far faster.",
  specs:[["Series","NVIDIA GeForce RTX 50xx, AMD Radeon RX 90xx, Intel Arc B-series."],["Model number","Second digit pair: 50 < 60 < 70 < 80 < 90. An RTX 5070 is stronger than an RTX 5060."],["VRAM","The GPU's own memory. 8 GB is getting tight for new games; 12–16 GB is safer."],["Watts (TGP)","Power it draws. Decides how big the PSU must be."]],
  more:["Higher FPS, and game graphics can be set to Ultra.","You can play at 1440p or 4K.","3D rendering, video editing, and local AI get much faster."],
  less:["For office work, Zoom, and YouTube, the CPU's integrated graphics are enough. No graphics card needed at all.","A 1080p 60 Hz monitor can't show what a high-end GPU can do.","A big GPU needs a bigger PSU, case, and better room cooling."],
  tiers:[["No card","CPU integrated graphics (iGPU)","Rp0"],["1080p gaming","RTX 5050 · RTX 5060 · Arc B580","Rp4–6.5M"],["High 1080p / 1440p","RTX 5060 Ti 16GB · RX 9060 XT","Rp7–10M"],["High 1440p","RTX 5070 · RX 9070","Rp10–15M"],["4K / heavy work","RTX 5080","Rp20–28M"],["Top of the line","RTX 5090","Rp55–80M"]],
  note:"GPUs are also hit by the memory shortage. Some RTX 50 models sold 50–80% above their official price in mid-2026.",
  tips:["Match it to the monitor. High-end GPU + 60 Hz monitor = wasted money.","The monitor cable goes into the GPU's port, not the motherboard's. This is the most common beginner mistake."],
  q:"rtx 5060 ti 16gb"
},
{
  id:"nvme", name:"NVMe SSD", alias:"M.2 · Main storage",
  deep:["An SSD stores data in NAND chips, tiny cells that hold an electrical charge even with the power off. Because there's no spinning platter, an SSD can open thousands of small files almost instantly. That's what lets Windows start in a dozen seconds or so.",
   "NVMe is the \"language\" modern SSDs use to talk directly over PCIe lanes, the same lanes the graphics card uses. That's why NVMe can be 6–25 times faster than a SATA SSD. M.2 is only the physical shape of the stick. Some M.2 SSDs still use SATA and are no faster than an ordinary SATA SSD.",
   "What separates cheap and expensive SSDs: whether there's a DRAM cache (keeps speed steady), the NAND type (TLC lasts longer than QLC), and the TBW rating (how many terabytes may be written during the warranty). For office PCs, even a Gen4 NVMe SSD without DRAM is far more than enough."],
  where:"A small stick about the size of a stick of gum, lying flat on the motherboard between the CPU and graphics card. Often covered by a metal heat plate.",
  what:"Where Windows, apps, files, and games are stored permanently. Nothing is lost when the power goes off. NVMe plugs straight into PCIe lanes, so it's much faster than a hard disk.",
  analogy:"The filing cabinet next to the desk. The bigger the cabinet, the more files it holds. NVMe is a cabinet whose drawers open themselves in an instant.",
  specs:[["Capacity","512 GB, 1 TB, 2 TB, 4 TB. Modern games take 80–150 GB each."],["PCIe generation","Gen3 ±3,500 MB/s, Gen4 ±7,000 MB/s, Gen5 ±12,000 MB/s."],["2280 size","80 mm long, the standard size for PCs and most laptops."],["DRAM cache / TBW","Indicators of quality and write endurance."]],
  more:["More room for games, video, and photos.","Larger SSDs are usually also a bit faster and more durable."],
  less:["Windows boots almost as fast on Gen3 as on Gen5. The difference only shows when copying huge files.","For offices that keep files in the cloud, 512 GB is enough."],
  tiers:[["Office","512 GB Gen3/Gen4","Rp1.2–2M"],["Standard","1 TB Gen4 · Kingston NV3, WD SN7100","Rp2.5–3.5M"],["Gamer / creator","2 TB Gen4","Rp4.5–7M"],["Premium","1–2 TB Gen5 · Samsung 9100 Pro","Rp5–9M"]],
  note:"Like RAM, SSD prices rose throughout 2026 because NAND chips were diverted to data centres.",
  tips:["Swapping a hard disk for an SSD is the most noticeable upgrade for an old PC or laptop.","Keep 15–20% free space so the SSD stays fast."],
  q:"ssd nvme 1tb gen4"
},
{
  id:"sata", name:"HDD & SATA SSD", alias:"Extra storage",
  deep:["A hard disk works like a vinyl record: magnetic platters spin 5,400–7,200 times per minute, and a read head moves above them at a gap thinner than a fingerprint. Because it has to wait for the platter to spin to the right spot, opening thousands of small files feels very slow.",
   "HDDs still have strengths: the lowest price per terabyte, and data can sit on a shelf for a long time. That's why HDDs are still used for backups, archives, office NAS boxes, and CCTV recordings.",
   "HDDs are sensitive to shocks while running and wear out over time. Warning signs: repeated clicking, the PC often \"not responding\" when opening files, or the SMART status in CrystalDiskInfo changing to \"Caution\". Back up immediately if you see any of these."],
  where:"In the drive bay at the lower front of the case, behind the PSU shroud. 2.5\" SATA SSDs are often mounted on top of the shroud or behind the motherboard.",
  what:"Older-style storage connected with a SATA cable. A hard disk (HDD) uses spinning platters and a read head, like a record player. Cheap per terabyte, but slow and can be damaged if knocked.",
  analogy:"An HDD is the big warehouse behind the shop. Cheap and roomy, but fetching things takes a while.",
  specs:[["3.5\" HDD","Spins at 7200 rpm, ±150–250 MB/s. Good for archives, backups, and CCTV."],["2.5\" SATA SSD","±550 MB/s. Cheap upgrade for older PCs/laptops without an M.2 slot."],["Capacity","HDD 1–20 TB, SATA SSD 256 GB–4 TB."]],
  more:["Can hold years of archives, family photos, and backups."],
  less:["Don't install Windows on an HDD. Booting can take 1–2 minutes.","If all your files fit on the NVMe, you don't need an HDD."],
  tiers:[["SATA SSD","500 GB – 1 TB","Rp0.9–2.2M"],["Archive HDD","2 TB 7200 rpm","Rp1–1.6M"],["Large HDD","4 TB","Rp1.8–2.8M"]],
  tips:["HDDs are the cheapest per TB, so they suit office data backups."],
  q:"hdd 4tb"
},
{
  id:"psu", name:"Power Supply", alias:"PSU · Power Supply Unit",
  deep:["Mains power in Indonesia is 220 V alternating current. Every chip in a PC needs low-voltage, very stable direct current: 12 V for the CPU and GPU, 5 V and 3.3 V for other devices. The PSU rectifies, steps down, and smooths that power, then distributes it to each component through its cables.",
   "Inside a PSU are capacitors, transformers, and regulating circuits. The quality of these parts separates a good PSU from a bad one. A quality PSU keeps voltage steady when the GPU suddenly pulls a lot of power, and has protections that cut power before damage happens. Cheap PSUs often print a wattage on the label that they can't actually deliver.",
   "The PSU also decides how well a PC copes with Indonesia's sometimes-unstable electricity. For office PCs, a decent PSU combined with a UPS or stabilizer is a small investment that prevents a lot of damage.",
   "Never open a PSU's casing. Its large capacitors can hold a dangerous high-voltage charge for hours after being unplugged."],
  where:"The metal box at the lower rear of the case, usually under a shroud. The power cord from the wall socket plugs in here.",
  what:"Converts 220 V mains power into the 12 V, 5 V, and 3.3 V that components need, then distributes it through cables to the motherboard, CPU, GPU, and drives.",
  analogy:"Like a heart pumping blood through the body. A weak heart makes every organ struggle.",
  specs:[["Watts","Maximum power. Office 450–550 W, gaming 650–850 W, high-end 1000 W+."],["80+ certification","Efficiency: Bronze < Gold < Platinum. Gold wastes less electricity as heat."],["Modular","Cables can be detached, so the case is tidier."],["ATX 3.1 / 12V-2x6","New connector for high-end RTX 50 GPUs."]],
  more:["Room for a bigger GPU and future upgrades.","Runs at a lower load, so it's quieter and lasts longer."],
  less:["A 1000 W PSU doesn't raise your electricity bill. A PC only draws the power it needs. But it doesn't make the PC faster either.","For an office PC without a GPU drawing about 150 W, a 450 W PSU is plenty."],
  tiers:[["Office","450–550 W 80+ Bronze","Rp500K–1M"],["Gaming","650–850 W 80+ Gold","Rp1.2–2.5M"],["High-end","1000–1200 W Gold/Platinum ATX 3.1","Rp2.5–5M"]],
  extra:[{h:"How the PSU affects the PC",items:["Stability: a good PSU keeps voltage steady as load rises and falls. A bad PSU causes random restarts or blue screens that are hard to trace.","Safety: a quality PSU has OVP, OCP, SCP, and OTP protection (over-voltage, over-current, short circuit, over-temperature). When something goes wrong, it shuts itself off before other components are damaged.","Efficiency: an 80+ Gold PSU wastes about 10% of the power as heat, while an uncertified one can waste 20–25%. For PCs running 8–24 hours in an office, the difference shows up on the bill.","Lifespan: good PSUs usually carry a 5–10 year warranty and can move into your next build.","Upgrades: spare wattage lets you fit a bigger GPU later without replacing the PSU."]},
         {h:"What makes a PC need a bigger PSU",items:["GPU: the biggest factor. RTX 5060 ±145 W, RTX 5080 ±360 W, RTX 5090 ±575 W.","CPU: Ryzen 5 9600X ±88 W, Core Ultra 9 285K up to ±250 W.","RAM: only ±3–5 W per stick. 64 GB of RAM barely changes the PSU you need.","SSD ±5–8 W, HDD ±6–9 W, fans ±2–3 W each."]}],
  tips:["Don't skimp on the PSU. A junk PSU that fails can take the motherboard and GPU with it.","Use the PSU calculator on the Choosing page to work out the wattage you need."],
  q:"psu 750w gold"
},
{
  id:"fans", name:"Case Fans", alias:"Case fan · 120 / 140 mm",
  deep:["Case fans don't cool components directly. Their job is to replace hot air inside the case with cooler room air. CPU and GPU coolers can only work as well as the air they receive.",
   "The most common and effective pattern: front fans pull air in (intake), rear and top fans push air out (exhaust). Aim for slightly more air coming in than going out (positive pressure), so dust only enters through the front filter instead of every gap in the case.",
   "You can tell a fan's airflow direction from its frame. The side with the struts holding the motor is the air-out side, and there's usually a small arrow on the side of the fan."],
  where:"Three at the front pull cool air in, one at the back pushes hot air out.",
  what:"Manages airflow. Cool air comes in at the front, passes the GPU and CPU, and leaves through the back and top. Without this flow, heat gets trapped inside the case.",
  analogy:"A house's ventilation. The air conditioner in one room (the CPU cooler) doesn't help much if every window in the house is shut.",
  specs:[["Size","120 mm or 140 mm. A 140 mm fan can be quieter for the same airflow."],["PWM","Speed adjusts automatically with temperature."],["ARGB","Colourful lights. Purely cosmetic."]],
  more:["Every component runs cooler, and fans can spin slower."],
  less:["More than 5–6 fans usually doesn't lower temperatures further, it just adds noise and dust.","An office PC needs only 1–2 fans."],
  tiers:[["Single","Basic 120 mm fan","Rp40–120K"],["3-pack","120 mm ARGB","Rp200–500K"],["Premium","Noctua, Lian Li, Arctic P14","Rp150–400K/fan"]],
  tips:["Clean out dust every 3–6 months. Dust is the number one enemy of rented office PCs."],
  q:"kipas casing 120mm argb"
},
{
  id:"case", name:"Case", alias:"Case · Chassis",
  deep:["The case decides three things: which components fit, how cool they run, and how quiet the PC is. Always check its specs: maximum GPU length, maximum CPU cooler height, supported motherboard sizes, and how many fans or radiators fit.",
   "Cases with a full-glass front look great, but often run hotter because air can only get in through narrow side gaps. A mesh front panel almost always makes every component cooler and the fans quieter.",
   "For offices, the case is also about maintenance: dust filters that are easy to remove, space to route cables behind the motherboard, and front USB ports staff can easily reach."],
  where:"The home for every component. A glass side panel shows what's inside. The power button and front USB ports are on top.",
  what:"Protects components from dust and knocks, manages airflow, and sets the maximum size of components that can be installed.",
  analogy:"Like a house. Its size decides how much furniture fits, and its windows decide how cool it stays inside.",
  specs:[["Size","Full tower, mid tower (most common), micro / mini-ITX."],["Front panel","Mesh (lots of holes, cooler) or glass/solid (quieter, hotter)."],["Size limits","Maximum GPU length and maximum CPU cooler height."],["Front ports","USB-A, USB-C, audio jack."]],
  more:["More room for long GPUs, radiators, and fans.","Easier building and cable management."],
  less:["A case doesn't make a PC faster. A cheap mesh-front case is often cooler than an expensive all-glass one.","Office PCs can use a small micro-ATX case under the desk."],
  tiers:[["Office","Simple Micro-ATX","Rp350–600K"],["Gaming mid tower","Mesh front + glass side","Rp700K–1.5M"],["Premium","Lian Li, Fractal, NZXT","Rp1.5–4M"]],
  tips:["Check GPU length and CPU cooler height against the case's limits before buying."],
  q:"casing pc mid tower mesh"
}
];

const CM = "https://commons.wikimedia.org/wiki/File:";
window.PHOTOS = {
  cpu:{src:"img/cpu.jpg",alt:"Intel Core i9-14900KF processor seen from above",caption:"Intel Core i9-14900KF. The metal top is called the heat spreader",title:"Intel i9-14900KF CPU.jpg",author:"Pstrahl",license:"CC BY-SA 4.0",page:CM+"Intel_i9-14900KF_CPU.jpg"},
  cooler:{src:"img/cooler.jpg",alt:"Jonsbo CR-1000 GT tower CPU cooler seen from above, showing fins and copper heatpipes",caption:"Jonsbo CR-1000 GT from above. You can see the aluminium fins and copper heatpipes",title:"Jonsbo CR-1000 GT CPU-Kühler",author:"PantheraLeo1359531",license:"CC BY 4.0",page:CM+"Jonsbo_CR-1000_GT_CPU-K%C3%BChler,_ARGB_-_120mm,_schwarz_20201120_DSC6204.jpg"},
  mobo:{src:"img/mobo.jpg",alt:"Open AM5 socket on a motherboard with thousands of pins",caption:"An AM5 socket on a motherboard, opened. This is where the CPU is locked in",title:"AM5 Socket Open.jpg",author:"CristoCalis",license:"CC BY-SA 4.0",page:CM+"AM5_Socket_Open.jpg"},
  ram:{src:"img/ram.jpg",alt:"Both sides of an SK hynix 16 GB DDR5 RAM stick",caption:"SK hynix DDR5-5600 16 GB, front and back. The black squares are the memory chips",title:"SK hynix 16GB DDR5-5600 UDIMM",author:"ITEagle Europe – Sebastiaan Broekhoven",license:"CC BY-SA 4.0",page:CM+"SK_hynix_16GB_DDR5-5600_UDIMM_HMCG78AGBUA084N_BA.jpg"},
  gpu:{src:"img/gpu.jpg",alt:"Palit GeForce RTX 5090 Gamerock graphics card with three fans",caption:"Palit GeForce RTX 5090 GameRock. The three fans face down once installed",title:"Palit GeForce RTX 5090 Gamerock",author:"PantheraLeo1359531",license:"CC BY 4.0",page:CM+"Palit_GeForce_RTX_5090_Gamerock_20250530_HOF4166_RAW-Export.png"},
  nvme:{src:"img/nvme.jpg",alt:"Kingston NV2 2 TB M.2 SSD",caption:"Kingston NV2 2 TB, a PCIe 4.0 NVMe SSD in M.2 2280 size",title:"2023 Dysk SSD Kingston NV2 2TB.jpg",author:"Jacek Halicki",license:"CC BY-SA 4.0",page:CM+"2023_Dysk_SSD_Kingston_NV2_2TB.jpg"},
  sata:{src:"img/sata.jpg",alt:"Seagate Barracuda 3.5-inch hard disk",caption:"Seagate Barracuda 3.5\" 7200 rpm hard disk. The platters and head are inside this metal casing",title:"ST3320620AS.jpg",author:"User5515",license:"CC0",page:CM+"ST3320620AS.jpg"},
  psu:{src:"img/psu.jpg",alt:"An opened power supply showing the fan, capacitors, heatsinks, and cables",caption:"Inside a PSU (older unit): aluminium heatsinks, transformer, capacitors, and cable bundle",title:"PSU-Open1.jpg",author:"Wikimedia Commons",license:"Public domain",page:CM+"PSU-Open1.jpg"},
  fans:{src:"img/fans.jpg",alt:"Kolink Observatory case with three fans in the front panel",caption:"Three intake fans in the front of a Kolink Observatory case",title:"PC-Gehäuse Kolink Observatory RGB",author:"PantheraLeo1359531",license:"CC BY 4.0",page:CM+"PC-Geh%C3%A4use_Kolink_Observatory_RGB_Midi-Tower_20201120_DSC6134.jpg"},
  case:{src:"img/case.jpg",alt:"Inside a modern custom-built PC with GPU, RAM, AIO cooler, and RGB fans",caption:"A real custom-built PC from 2026. Try to spot the GPU, RAM, and AIO cooler",title:"2026 Wnętrze komputera PC.jpg",author:"Jacek Halicki",license:"CC BY-SA 4.0",page:CM+"2026_Wn%C4%99trze_komputera_PC.jpg"}
};

window.CPUS = [["Core i3-14100 (office)",110],["Ryzen 5 8500G (office)",88],["Ryzen 5 9600X",88],["Core Ultra 5 245K",159],["Ryzen 7 9800X3D",162],["Core Ultra 7 265K",250],["Ryzen 9 9950X",230],["Core Ultra 9 285K",250]];
window.GPUS = [["None (CPU integrated graphics)",0,0],["RTX 5050",130,550],["RTX 5060",145,550],["Arc B580",190,0],["RTX 5060 Ti 16GB",180,600],["RX 9060 XT 16GB",160,0],["RTX 5070",250,650],["RX 9070",220,0],["RX 9070 XT",304,0],["RTX 5070 Ti",300,750],["RTX 5080",360,850],["RTX 5090",575,1000]];

window.BUILDS = [
  {id:"kantor", name:"Office & school", total:"Rp8–10M", desc:"Word, Excel, browser, Zoom, point-of-sale apps. This is the kind of spec most often rented out to companies.", rows:[
    ["cpu","Ryzen 5 8500G (integrated graphics)","Rp2.2M"],["cooler","Stock CPU fan","Rp0"],["mobo","AMD A620 Micro-ATX","Rp1.4M"],["ram","16 GB DDR5 (2×8)","Rp2.8M"],["gpu","Not needed, uses the iGPU","Rp0"],["nvme","512 GB NVMe Gen4","Rp1.4M"],["psu","500 W 80+ Bronze","Rp650K"],["case","Micro-ATX + 1 fan","Rp450K"]]},
  {id:"gaming", name:"Gaming 1080p–1440p", total:"Rp24–28M", desc:"New games on high settings, light streaming, occasional video editing.", rows:[
    ["cpu","Ryzen 5 9600X / Core Ultra 5 245K","Rp3.6M"],["cooler","Dual-fan tower","Rp550K"],["mobo","AMD B650 ATX","Rp2.6M"],["ram","32 GB DDR5-6000 (2×16)","Rp5.5M"],["gpu","RTX 5060 Ti 16 GB","Rp8.5M"],["nvme","1 TB NVMe Gen4","Rp2.9M"],["psu","750 W 80+ Gold","Rp1.6M"],["case","Mesh mid tower + 4 fans","Rp1M"]]},
  {id:"kreator", name:"Creator & AI", total:"Rp60–70M", desc:"4K editing, 3D rendering, architecture, running AI models on your own computer.", rows:[
    ["cpu","Ryzen 9 9950X","Rp10.5M"],["cooler","360 mm AIO","Rp2.2M"],["mobo","AMD X870 ATX","Rp5M"],["ram","64 GB DDR5 (2×32)","Rp11M"],["gpu","RTX 5080 16 GB","Rp24M"],["nvme","2 TB NVMe Gen4 + 4 TB HDD","Rp8M"],["psu","1000 W 80+ Gold ATX 3.1","Rp3M"],["case","Premium mid/full tower","Rp2M"]]}
];

window.LAYERS = [
  {id:"app", name:"Applications", short:"Chrome, Excel, games, Photoshop", body:"The programs you use directly. Applications don't talk to the hardware themselves. They ask the operating system for help: \"please save this file\", \"please show this image\".", ex:"What applications need decides the PC's spec. Check the \"minimum / recommended requirements\" on the app's or game's website."},
  {id:"os", name:"Operating system", short:"Windows 11, macOS, Linux", body:"The manager of the whole computer. The OS shares CPU time between applications, manages what's in RAM, organises files on the SSD, and draws windows on the screen. Its core is called the kernel.", ex:"Windows 11 needs at least 4 GB of RAM, 64 GB of storage, and a TPM 2.0 security chip. An official Windows 11 Home licence costs about Rp1.9–2.3M."},
  {id:"driver", name:"Drivers", short:"A translator for each component", body:"Small programs that teach the OS how to talk to one particular piece of hardware. An NVIDIA graphics card needs NVIDIA's driver, Wi-Fi needs a Wi-Fi driver, and so on.", ex:"If games stutter or the screen resolution looks wrong after reinstalling Windows, the GPU driver usually hasn't been installed."},
  {id:"firmware", name:"Firmware", short:"BIOS / UEFI on the motherboard chip", body:"The first software that runs when the PC turns on, stored on a small chip on the motherboard. It checks the hardware, then hands control to the OS. Here you can set the boot order, enable RAM speed profiles (XMP/EXPO), and see CPU temperature.", ex:"Enter the BIOS by repeatedly pressing Del or F2 right after pressing the power button."}
];
