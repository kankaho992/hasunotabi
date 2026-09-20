// ===== 全局資料 =====
let spotsData = [];
let eventsData = [];
let map = null;
let mapMarkers = [];
let currentCalYear = new Date().getFullYear();
let currentCalMonth = new Date().getMonth(); // 0-11
let calendar = null;

// ===== Lightbox 狀態 =====
let currentGalleryImages = [];
let lightboxIndex = 0;

// ===== 本地輕量化簡繁轉換引擎 (零外部依賴) =====
const s2tDict = {
    '国':'國','国':'國','爱':'愛','学':'學','会':'會','时':'時','间':'間','关':'關','队':'隊','动':'動',
    '场':'場','观':'觀','团':'團','线':'線','乐':'樂','车':'車','长':'長','发':'發','见':'見','体':'體',
    '话':'話','书':'書','记':'記','录':'錄','预':'預','约':'約','现':'現','统':'統','计':'計','带':'帶',
    '点':'點','类':'類','别':'別','单':'單','双':'雙','图':'圖','片':'片','画':'畫','面':'面','页':'頁',
    '报':'報','名':'名','设':'設','定':'定','开':'開','关':'關','节':'節','目':'目','选':'選','择':'擇',
    '项':'項','内':'內','容':'容','细':'細','节':'節','查':'查','询':'詢','搜':'搜','索':'索','地':'地',
    '标':'標','质':'質','量':'量','简':'簡','体':'體','繁':'繁','换':'換','切':'切','换':'換','正':'正',
    '在':'在','进':'進','行':'行','能':'能','登':'登','应':'應','援':'援','联':'聯','项':'項','复':'復',
    '兴':'興','半':'半','岛':'島','展':'展','板':'標','观':'觀','光':'光','内':'內','新':'新','剧':'劇',
    '情':'情','歌':'歌','曲':'曲','插':'插','周':'週','边':'邊','铁':'鐵','道':'道','温':'溫','泉':'泉',
    '假':'假','日':'日','发':'發','售':'售','全':'全','部':'部','游':'遊','戏':'戲','卡':'卡','面':'面',
    '备':'備','莲':'蓮','传':'傳','统':'統','工':'工','艺':'藝','大':'大','地':'地','址':'址','业':'業',
    '营':'營','费':'費','用':'用','备':'備','注':'注','打':'打','东':'東','京':'京','周':'週','天':'天',
    '算':'算','数':'數','据':'據','重':'重','置':'置','加':'加','载':'載','失':'失','败':'敗','贺':'賀',
    '乡': '鄉','欢': '歡','圣': '聖','礼': '禮','规': '規','体': '體','丽': '麗','历': '歷',
    '台': '臺','后': '後','发': '發','复': '復','团': '團','圆': '圓','场': '場','声': '聲',
    '卖': '賣','宝': '寶','实': '實','对': '對','当': '當','录': '錄','见': '見','观': '觀',
    '觉': '覺','购': '購','过': '過','运': '運','进': '進','选': '選','饭': '飯','饮': '飲',
    '馆': '館','鱼': '魚','鸟': '鳥','龙': '龍','风': '風','凤': '鳳','飞': '飛','龟': '龜',
    '电': '電','话': '話','机': '機','车': '車','铁': '鐵','银': '銀','铜': '銅','钱': '錢',
    '钟': '鐘','钢': '鋼','门': '門','关': '關','开': '開','闭': '閉','队': '隊','阶': '階',
    '际': '際','县': '縣','泽': '澤','园': '園','资': '資','广': '廣','禅': '禪','宾': '賓',
    '纪': '紀','击': '擊','灯': '燈','笼': '籠','叶': '葉','汤': '湯','桥': '橋','万': '萬',
    '产': '產','驿': '驛','总': '總','连': '連','农': '農','横': '橫','滨': '濱','厅': '廳',
    '饰': '飾','尔': '爾','样': '樣','顶': '頂','烧': '燒','专': '專','丰': '豐','览': '覽',
    '张': '張','议': '議','鲜': '鮮','寿': '壽','验': '驗','仓': '倉','鸡': '雞','浅': '淺',
    '刚': '剛','说': '說','备注': '備註','纸': '紙','领': '領','盖': '蓋','区': '區','认': '認',
    '请': '請','网': '網','贩': '販','辑': '輯','弹': '彈','员': '員','频': '頻','属': '屬',
    '们': '們','梦': '夢','变': '變','尽': '盡','远': '遠'
};

// 用來反向生成繁轉簡的常用字庫 + 常見簡體字表
const t2sMap = {
    '蓮':'莲','館':'馆','應':'应','援':'援','記':'记','錄':'录','主':'主','頁':'页','蓮':'莲','旅':'旅',
    '蓮':'莲','活':'活','學院':'学院','驚':'惊','極':'极','劃':'划','擺':'摆','設':'设','備':'备',
    '個':'个','這':'这','點':'点','動':'动','現':'现','場':'场','畫':'画','線':'线','關':'关','聯':'联',
    '活動':'活动','紀錄':'记录','傳統':'传统','工藝':'工艺','溫泉':'温泉','觀光':'观光','說明':'說明',
    '項目':'项目','復興':'复兴','展示':'展示','內容':'内容','周邊':'周边','鐵道':'铁道','發售':'发售',
    '全部':'全部','遊戲':'游戏','準備':'准备','書籍':'书籍','能登':'能登','其它':'其它','進行':'进行',
    '地圖':'地图','營業':'营业','時間':'时间','費用':'费用','備註':'备注','東京':'东京','星期':'星期',
    '年始':'年始','年末':'年末','消息':'消息','交通':'交通','詳情':'详情','日期':'日期','地點':'地点',
    '列表':'列表','月曆':'月历','今天':'今天','載入':'载入','失敗':'失败','切換':'切换','簡體':'简体',
    '繁體':'繁体','賀':'贺','鄉': '乡','歡': '欢','聖': '圣','禮': '礼','規': '规','體': '体','麗': '丽','歷': '历',
    '臺': '台','後': '后','發': '发','復': '复','團': '团','圓': '圆','場': '场','聲': '声',
    '賣': '卖','寶': '宝','實': '实','對': '对','當': '当','錄': '录','見': '见','觀': '观',
    '覺': '觉','購': '购','過': '过','運': '运','進': '进','選': '选','飯': '饭','飲': '饮',
    '館': '馆','魚': '鱼','鳥': '鸟','龍': '龙','龜': '龟','風': '风','鳳': '凤','飛': '飞',
    '電': '电','話': '话','機': '机','車': '车','鐵': '铁','銀': '银','銅': '铜','錢': '钱',
    '鐘': '钟','鋼': '钢','門': '门','關': '关','開': '开','閉': '闭','隊': '队','階': '阶',
    '際': '际','縣': '县','澤': '泽','園': '园','資': '资','廣': '广','禪': '禅','賓': '宾',
    '紀': '纪','擊': '击','燈': '灯','籠': '笼','葉': '叶','湯': '汤','橋': '桥','萬': '万',
    '產': '产','驛': '驿','總': '总','連': '连','農': '农','橫': '横','濱': '滨','廳': '厅',
    '飾': '饰','爾': '尔','樣': '样','頂': '顶','燒': '烧','專': '专','豐': '丰','覽': '览',
    '張': '张','議': '议','鮮': '鲜','壽': '寿','驗': '验','倉': '仓','雞': '鸡','淺': '浅',
    '剛': '刚','說': '说','紙': '纸','領': '领','蓋': '盖','區': '区','認': '认',
    '請': '请','網': '网','販': '贩','輯': '辑','彈': '弹','員': '员','頻': '频','屬': '属',
    '們': '们','夢': '梦','變': '变','盡': '尽','遠': '远'
};

// 構建替換正則表達式
let s2tReg = null;
let t2sReg = null;

function initDict() {
    // 建立繁轉簡的映射表 (反向與補全)
    const t2sDict = {};
    for (let k in s2tDict) { t2sDict[s2tDict[k]] = k; }
    for (let k in t2sMap) { t2sDict[k] = t2sMap[k]; }

    // 建立簡轉繁的映射表
    const s2tDictFull = {};
    for (let k in t2sDict) { s2tDictFull[t2sDict[k]] = k; }
    for (let k in s2tDict) { s2tDictFull[k] = s2tDict[k]; }

    const tKeys = Object.keys(t2sDict).join('');
    const sKeys = Object.keys(s2tDictFull).join('');

    t2sReg = new RegExp('[' + tKeys + ']', 'g');
    s2tReg = new RegExp('[' + sKeys + ']', 'g');

    window.t2sConverter = (str) => str.replace(t2sReg, (m) => t2sDict[m] || m);
    window.s2tConverter = (str) => str.replace(s2tReg, (m) => s2tDictFull[m] || m);
}

initDict();

// 遞歸轉換 HTML 節點內的文字
function convertDOM(node, toSimplified) {
    if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim() !== '') {
            node.textContent = toSimplified 
                ? window.t2sConverter(node.textContent) 
                : window.s2tConverter(node.textContent);
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        // 避開不需要轉換的標籤
        if (['SCRIPT', 'STYLE', 'TEXTAREA'].includes(node.tagName)) return;
        for (let child of node.childNodes) {
            convertDOM(child, toSimplified);
        }
    }
}

let currentLang = localStorage.getItem('site_lang') || 'hk';
let langObserver = null;

function initLanguage() {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;

    btn.addEventListener('click', toggleLanguage);

    // 監聽動態渲染出來的新 DOM 元素 (例如列表點擊、月份切換)
    langObserver = new MutationObserver((mutations) => {
        if (currentLang === 'hk') return;
        langObserver.disconnect();
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                convertDOM(node, true);
            });
        });
        langObserver.observe(document.body, { childList: true, subtree: true });
    });

    // 如果記憶中是簡體，立即轉換整頁
    if (currentLang === 'cn') {
        convertDOM(document.body, true);
        btn.innerText = '繁';
    }

    langObserver.observe(document.body, { childList: true, subtree: true });
    console.log("✅ 本地簡繁轉換系統就緒");
}

function toggleLanguage() {
    const btn = document.getElementById('lang-toggle');
    if (langObserver) langObserver.disconnect();

    if (currentLang === 'hk') {
        currentLang = 'cn';
        convertDOM(document.body, true);
        btn.innerText = '繁';
        localStorage.setItem('site_lang', 'cn');
    } else {
        currentLang = 'hk';
        convertDOM(document.body, false);
        btn.innerText = '簡';
        localStorage.setItem('site_lang', 'hk');
    }

    if (langObserver) langObserver.observe(document.body, { childList: true, subtree: true });
}

// 景點分類定義 (15個)
const spotCategories = [
    { id: 0, name: '全部', colorVar: 'var(--color-0)' },
    { id: 1, name: '遊戲卡圖', colorVar: 'var(--color-1)' },
    { id: 2, name: '活動記錄', colorVar: 'var(--color-2)' },
    { id: 3, name: '準備蓮', colorVar: 'var(--color-3)' },
    { id: 4, name: 'Fes×LIVE / With×MEETS', colorVar: 'var(--color-4)' },
    { id: 5, name: 'CD / 書籍 / 歌曲', colorVar: 'var(--color-5)' },
    { id: 6, name: 'Live Event', colorVar: 'var(--color-6)' },
    { id: 7, name: '石川縣聯動', colorVar: 'var(--color-7)' },
    { id: 8, name: '加賀友禪聯動', colorVar: 'var(--color-8)' },
    { id: 9, name: '傳統工藝聯動', colorVar: 'var(--color-9)' },
    { id: 10, name: 'HASUNOSORA FANTASY', colorVar: 'var(--color-10)' },
    { id: 11, name: '能登應援', colorVar: 'var(--color-11)' },
    { id: 12, name: '石川大觀光II聯動', colorVar: 'var(--color-12)' },
    { id: 13, name: '加賀溫泉鄉聯動', colorVar: 'var(--color-13)' },
    { id: 14, name: '其他', colorVar: 'var(--color-14)' }
];

// 活動分類定義 (7個)
const eventCategories = [
    { id: 0, name: '全部', colorVar: 'var(--color-0)' },
    { id: 1, name: '多媒體', colorVar: 'var(--color-1)' },
    { id: 2, name: 'Live', colorVar: 'var(--color-2)' },
    { id: 3, name: '遊戲', colorVar: 'var(--color-3)' },
    { id: 4, name: '商品', colorVar: 'var(--color-4)' },
    { id: 5, name: '線下活動', colorVar: 'var(--color-5)' },
    { id: 6, name: '其他', colorVar: 'var(--color-6)' }
];

let activeSpotFilters = new Set([0]);
let activeEventFilters = new Set([0]);

// ===== 主頁：進行中聯動卡片設定 =====
const ongoingCampaigns = [
    {
        categoryId: 11,
        title: '能登應援項目聯動',
        thumb: 'noto_oen_kv.jpg',
        description: '能登應援項目正在進行，為能登復興，在能登半島不同地方展示105期8位成員的展板，一起去看能登的天空吧！',
        startDate: '2026-02-13',
        endDate: '2026秋'
    },
    {
        categoryId: 12,
        title: '石川縣x蓮之空聯動第五彈：石川大觀光II',
        thumb: 'noto_colab5_kv.jpg',
        description: '石川縣x蓮之空的大型聯動第五彈正在進行，主題是石川大觀光II，內容包括新的打卡活動、新劇情和歌曲、新插圖周邊、IR石川鐵道聯動。',
        startDate: '2026-08-10',
        endDate: '2026-12-06'
    },
    {
        categoryId: 13,
        title: '加賀溫泉鄉聯動',
        thumb: 'kaga_colab_kv.jpg',
        description: '加賀溫泉鄉x蓮之空聯動企劃正在進行中，以蓮之小四邊形的假日為主題，在加賀溫泉展開的打卡活動、聯動周邊發售等。',
        startDate: '2026-08-10',
        endDate: '2026-11-30'
    }
];

// ===== 工具函數 =====
// 兼容三種圖片來源：base64 data URL、http(s) 網址、純檔名（自動補 images/ 前綴）
function imgSrc(path) {
    if (!path) return '';
    if (/^(data:|https?:\/\/|blob:)/i.test(path)) return path;
    if (path.startsWith('images/')) return path;
    return 'images/' + path;
}

// 取得詳情頁要顯示的圖片陣列：優先用 gallery；舊資料只有 thumb 時顯示 thumb
function getDetailImages(item) {
    if (item.gallery && item.gallery.length) return item.gallery;
    return item.thumb ? [item.thumb] : [];
}

function getCount(catId, data) {
    if (catId === 0) return data.length;
    return data.filter(item => item.categories && item.categories.includes(catId)).length;
}

// ===== Lightbox =====
function initLightbox() {
    const lb = document.createElement('div');
    lb.id = 'lightbox-overlay';
    lb.className = 'lightbox-overlay';
    lb.innerHTML = `
        <button class="lightbox-close" onclick="closeLightbox()" title="關閉">✕</button>
        <button class="lightbox-arrow lightbox-prev" onclick="changeLightbox(-1)" title="上一張">❮</button>
        <img id="lightbox-img" class="lightbox-img" src="" alt="大圖">
        <button class="lightbox-arrow lightbox-next" onclick="changeLightbox(1)" title="下一張">❯</button>
        <div id="lightbox-counter" class="lightbox-counter"></div>
    `;
    // 點擊黑色背景關閉
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    document.body.appendChild(lb);
    // 鍵盤操作
    document.addEventListener('keydown', e => {
        const overlay = document.getElementById('lightbox-overlay');
        if (!overlay || !overlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeLightbox(-1);
        if (e.key === 'ArrowRight') changeLightbox(1);
    });
}

function openLightbox(index) {
    if (!currentGalleryImages.length) return;
    lightboxIndex = index;
    updateLightboxImage();
    document.getElementById('lightbox-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

function changeLightbox(delta) {
    const n = currentGalleryImages.length;
    if (!n) return;
    lightboxIndex = (lightboxIndex + delta + n) % n;
    updateLightboxImage();
}

function updateLightboxImage() {
    const n = currentGalleryImages.length;
    document.getElementById('lightbox-img').src = imgSrc(currentGalleryImages[lightboxIndex]);
    document.getElementById('lightbox-counter').textContent = `${lightboxIndex + 1} / ${n}`;
    // 只有一張圖時隱藏左右箭頭
    const show = n > 1 ? 'block' : 'none';
    document.querySelector('.lightbox-prev').style.display = show;
    document.querySelector('.lightbox-next').style.display = show;
}

// 建立詳情頁下方的圓角圖片庫 HTML（同時記錄目前圖片清單給 Lightbox 用）
function buildGalleryHtml(images) {
    currentGalleryImages = images || [];
    if (!currentGalleryImages.length) return '';
    const frames = currentGalleryImages.map((img, i) => `
        <div class="gallery-frame" onclick="openLightbox(${i})" title="點擊查看大圖">
            <img src="${imgSrc(img)}" alt="圖片${i + 1}" loading="lazy">
        </div>
    `).join('');
    return `
        <div style="font-weight:700; margin-top:15px;">📷 圖片 (${currentGalleryImages.length})</div>
        <div class="gallery">${frames}</div>
    `;
}

// ===== 初始化 =====
document.addEventListener("DOMContentLoaded", async () => {
    initLanguage();
    try {
        const spotRes = await fetch('spots.json');
        spotsData = await spotRes.json();
    } catch (e) { console.log('尚未建立 spots.json'); }
    try {
        const eventRes = await fetch('events.json');
        eventsData = await eventRes.json();
    } catch (e) { console.log('尚未建立 events.json'); }

    initFilters('spot-filters', activeSpotFilters, spotCategories, spotsData, renderSpots);
    initFilters('event-filters', activeEventFilters, eventCategories, eventsData, refreshCalendarAndList);

    renderOngoingCards();
    renderUpcomingEvents();
    renderPastEvents();
    setInterval(updateCountdowns, 60000); // 每分鐘更新倒計時

    initLightbox();

    map = L.map('map').setView([36.5613, 136.6562], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
});

// ===== 頁面切換 =====
function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    event.currentTarget.classList.add('active');

    if (pageId === 'pilgrimage') {
        setTimeout(() => { map.invalidateSize(); renderSpots(); }, 100);
    }
    if (pageId === 'calendar') {
        if (!calendar) {
            initFullCalendar();
        } else {
            calendar.render();
        }
        refreshCalendarAndList();
    }
}

// ===== 主頁：進行中卡片 =====
function renderOngoingCards() {
    const container = document.getElementById('ongoing-cards');
    if (!container) return;
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const list = ongoingCampaigns.filter(c => c.startDate <= today && today <= c.endDate);
    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = '<p style="color:#999;">目前沒有進行中的聯動活動</p>';
        return;
    }
    list.forEach(c => {
        const cat = spotCategories.find(s => s.id === c.categoryId);
        const card = document.createElement('div');
        card.className = 'ongoing-card';
        card.innerHTML = `
            <img src="${imgSrc(c.thumb)}" alt="${c.title}">
            <div class="ongoing-info">
                <div class="ongoing-title">
                    <span class="ongoing-dot" style="background:${cat ? cat.colorVar : '#ccc'}"></span> ${c.title}
                </div>
                <div class="ongoing-desc">${c.description}</div>
                <div class="ongoing-date">${c.startDate} ~ ${c.endDate}</div>
            </div>`;
        card.onclick = () => goToTravelWithCategory(c.categoryId);
        container.appendChild(card);
    });
}

// ===== 輔助函式：智能解析活動的精確開始時間 (GMT+9) =====
function parseEventStartTime(event) {
    if (!event.startDate) return null;

    let hours = 0;
    let minutes = 0;

    if (event.time) {
        // 1. 優先尋找「開場」或「開演」前的時間 (例如: 14:30開場)
        let match = event.time.match(/(\d{1,2}):(\d{2})\s*(?:開場|開演)/);
        
        // 2. 若無，則抓取字串中第一個出現的 HH:MM (例如: 19:00)
        if (!match) {
            match = event.time.match(/(\d{1,2}):(\d{2})/);
        }
        
        if (match) {
            hours = parseInt(match[1], 10);
            minutes = parseInt(match[2], 10);
        }
    }

    // 組合成帶時區的 ISO 字串，例如 "2026-09-21T19:00:00+09:00"
    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
    return new Date(`${event.startDate}T${timeStr}+09:00`);
}
// ===== 主頁：一週內即將開始的活動（倒計時）=====
function renderUpcomingEvents() {
    const container = document.getElementById('upcoming-events');
    if (!container) return;

    const now = new Date(); // 本機當前時間 (內部為 UTC 時間戳)
    const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // 篩選：開始日期在「現在」到「一週後」之間
    const upcoming = eventsData.filter(e => {
        const start = parseEventStartTime(e);
        return start && start > now && start <= oneWeekLater;
    });

    // 依開始時間由近到遠排序（倒計時較少排前面）
    upcoming.sort((a, b) => parseEventStartTime(a) - parseEventStartTime(b));

    container.innerHTML = '';

    if (upcoming.length === 0) {
        container.innerHTML = '<p style="color:#999; padding:10px;">目前沒有即將開始的活動</p>';
        return;
    }
    
    upcoming.forEach(event => {
        // 取得精確開始時間的 UTC 時間戳 (毫秒)
        const startTimestamp = parseEventStartTime(event).getTime();

        const card = document.createElement('div');
        card.className = 'upcoming-card';
        card.style.cursor = 'pointer';
        card.onclick = () => goToCalendarEvent(event.id); // 綁定點擊跳轉
        
        // 判斷是否有縮圖，若無則顯示預設的日曆圖示背景
        const thumbHtml = event.thumb 
            ? `<img src="${imgSrc(event.thumb)}" class="upcoming-thumb" alt="${event.name}" loading="lazy">`
            : `<div class="upcoming-thumb" style="display:flex; align-items:center; justify-content:center; font-size:48px; color:#ccc;">📅</div>`;

        card.innerHTML = `
            ${thumbHtml}
            <div class="upcoming-content">
                <div class="upcoming-name" title="${event.name}">${event.name}</div>
                <!-- 將精確的 UTC 時間戳存入 data-start，供倒計時使用 -->
                <div class="upcoming-countdown" data-start="${startTimestamp}">計算中...</div>
            </div>
        `;
        container.appendChild(card);
    });

    updateCountdowns();
}

function updateCountdowns() {
    const now = new Date();
    document.querySelectorAll('.upcoming-countdown').forEach(el => {
        const startTimestamp = parseInt(el.dataset.start, 10);
        if (isNaN(startTimestamp)) return;
        
        // 直接將時間戳轉回 Date 物件進行計算
        const startDate = new Date(startTimestamp);
        const diff = startDate - now;

        if (diff <= 0) {
            el.textContent = '已開始 / 進行中';
            el.style.color = '#999';
            return;
        }

        const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        el.textContent = `${days}天 ${hours}時 ${minutes}分`;
    });
}

// ===== 輔助函式：智能解析活動的精確結束時間 (GMT+9) =====
function parseEventEndTime(event) {
    if (!event.endDate) return null;
    
    let hours = 23;
    let minutes = 59;
    
    if (event.time) {
        // 尋找結束時間（例如：19:00閉場、21:00終了）
        let match = event.time.match(/(\d{1,2}):(\d{2})\s*(?:閉場|終了|結束|完)/);
        
        // 如果沒有結束時間，嘗試找時間範圍的第二個時間（例如：14:00-18:00）
        if (!match) {
            const timeRanges = event.time.match(/(\d{1,2}):(\d{2})/g);
            if (timeRanges && timeRanges.length > 1) {
                const lastTime = timeRanges[timeRanges.length - 1];
                const timeMatch = lastTime.match(/(\d{1,2}):(\d{2})/);
                if (timeMatch) {
                    hours = parseInt(timeMatch[1], 10);
                    minutes = parseInt(timeMatch[2], 10);
                }
            }
        } else {
            hours = parseInt(match[1], 10);
            minutes = parseInt(match[2], 10);
        }
    }
    
    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
    return new Date(`${event.endDate}T${timeStr}+09:00`);
}

// ===== 主頁：剛過去7天內的活動 =====
function renderPastEvents() {
    const container = document.getElementById('past-events');
    if (!container) return;

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // 篩選：結束日期在「7天前」到「現在」之間
    const past = eventsData.filter(e => {
        const end = parseEventEndTime(e);
        return end && end >= sevenDaysAgo && end < now;
    });

    // 依結束時間由近到遠排序（最近的排前面）
    past.sort((a, b) => parseEventEndTime(b) - parseEventEndTime(a));

    container.innerHTML = '';

    if (past.length === 0) {
        container.innerHTML = '<p style="color:#999; padding:10px;">最近7天內沒有已結束的活動</p>';
        return;
    }

    past.forEach(event => {
        const endDate = parseEventEndTime(event);
        const diffMs = now - endDate;
        const daysAgo = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        const card = document.createElement('div');
        card.className = 'past-card';
        card.style.cursor = 'pointer';
        card.onclick = () => goToCalendarEvent(event.id);
        
        const thumbHtml = event.thumb 
            ? `<img src="${imgSrc(event.thumb)}" class="past-thumb" alt="${event.name}" loading="lazy">`
            : `<div class="past-thumb" style="display:flex; align-items:center; justify-content:center; font-size:48px; color:#ccc;"></div>`;

        card.innerHTML = `
            ${thumbHtml}
            <div class="past-content">
                <div class="past-name" title="${event.name}">${event.name}</div>
                <div class="past-ago">已過去 ${daysAgo} 天</div>
            </div>
        `;
        container.appendChild(card);
    });
}

// ===== 從首頁倒計時卡片跳轉到蓮活詳情 =====
function goToCalendarEvent(eventId) {
    const event = eventsData.find(e => e.id == eventId);
    if (!event) return;

    // 1. 切換頁面到「蓮活 EVENT」
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('calendar').classList.add('active');

    // 2. 切換左側選單高亮狀態
    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.menu-btn').forEach(b => {
        if ((b.getAttribute('onclick') || '').includes('calendar')) {
            b.classList.add('active');
        }
    });

    // 3. 確保日曆已初始化並刷新列表
    if (!calendar) {
        initFullCalendar();
    } else {
        calendar.render();
    }
    refreshCalendarAndList();

    // 4. 顯示活動詳情 (內部已包含跳轉日曆到該日期的邏輯)
    showEventDetailsById(eventId);
}

function goToTravelWithCategory(catId) {
    activeSpotFilters.clear();
    activeSpotFilters.add(catId);
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('pilgrimage').classList.add('active');
    document.querySelectorAll('.menu-btn').forEach(b => {
        if ((b.getAttribute('onclick') || '').includes('pilgrimage')) b.classList.add('active');
    });
    const filterBox = document.getElementById('spot-filters');
    Array.from(filterBox.children).forEach((child, index) => {
        const cat = spotCategories[index];
        if (activeSpotFilters.has(cat.id)) {
            child.classList.add('active');
            child.style.backgroundColor = cat.colorVar;
        } else {
            child.classList.remove('active');
            child.style.backgroundColor = '#fff';
        }
    });
    setTimeout(() => { map.invalidateSize(); renderSpots(); }, 100);
}

// ===== 過濾器 =====
function initFilters(containerId, activeSet, categoryList, dataList, renderCallback) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    categoryList.forEach(cat => {
        const count = getCount(cat.id, dataList);
        const btn = document.createElement('button');
        btn.className = `filter-tag ${activeSet.has(cat.id) ? 'active' : ''}`;
        btn.textContent = `${cat.name} (${count})`;
        if (activeSet.has(cat.id)) btn.style.backgroundColor = cat.colorVar;
        btn.onclick = () => {
            if (cat.id === 0) {
                activeSet.clear();
                activeSet.add(0);
            } else {
                activeSet.delete(0);
                if (activeSet.has(cat.id)) activeSet.delete(cat.id);
                else activeSet.add(cat.id);
                if (activeSet.size === 0) activeSet.add(0);
            }
            Array.from(container.children).forEach((child, index) => {
                if (activeSet.has(categoryList[index].id)) {
                    child.classList.add('active');
                    child.style.backgroundColor = categoryList[index].colorVar;
                } else {
                    child.classList.remove('active');
                    child.style.backgroundColor = '#fff';
                }
            });
            renderCallback();
        };
        container.appendChild(btn);
    });
}

function matchesFilter(itemCats, activeSet) {
    if (activeSet.has(0)) return true;
    return itemCats.some(catId => activeSet.has(catId));
}

// ===== 景點 =====
function renderSpots() {
    const list = document.getElementById('spot-list');
    list.innerHTML = '';
    mapMarkers.forEach(m => map.removeLayer(m));
    mapMarkers = [];
    const filtered = spotsData.filter(s => matchesFilter(s.categories, activeSpotFilters));
    filtered.forEach(spot => {
        const item = document.createElement('div');
        item.className = 'list-item';
        let tagsHtml = spot.categories.filter(id => id !== 0).map(id => {
            const cat = spotCategories.find(c => c.id === id);
            return cat ? `<span class="tag" style="background-color: ${cat.colorVar}">${cat.name}</span>` : '';
        }).join('');
        item.innerHTML = `
            ${spot.thumb ? `<img src="${imgSrc(spot.thumb)}" alt="thumb">` : `<div style="width:80px;height:80px;margin-right:15px;background:#eee;"></div>`}
            <div class="info">
                <div class="title">${spot.name}</div>
                <div class="tags">${tagsHtml}</div>
            </div>
        `;
        item.onclick = () => selectSpot(spot, item);
        list.appendChild(item);
        if (spot.lat && spot.lng) {
            const color = getMarkerColor(spot.categories);
            const marker = L.marker([spot.lat, spot.lng], {
                icon: createColoredMarker(color)
            }).addTo(map);
            marker.on('click', () => selectSpot(spot, item));
            mapMarkers.push(marker);
        }
    });
}

// 顯示景點詳細資料 + 底部圖片庫
function selectSpot(spot, listItemElement) {
    document.querySelectorAll('#spot-list .list-item').forEach(el => el.classList.remove('selected'));
    if (listItemElement) listItemElement.classList.add('selected');
    if (spot.lat && spot.lng) map.setView([spot.lat, spot.lng], 15);

    const details = document.getElementById('spot-details');
    details.style.display = 'block';
    details.innerHTML = `
        <h2 style="font-size: 1.3em; font-weight: bold; margin-bottom: 15px; text-align: left;">${spot.name}</h2>
        <table class="details-table">
            <tr><th>地址</th><td>${spot.address || '-'}</td></tr>
            <tr><th>營業時間</th><td>${spot.hours || '-'}</td></tr>
            <tr><th>定休日</th><td>${spot.holiday || '-'}</td></tr>
            <tr><th>電話</th><td>${spot.phone || '-'}</td></tr>
            <tr><th>費用</th><td>${spot.cost || '-'}</td></tr>
            <tr><th>說明</th><td>${(spot.description || '-').replace(/\n/g, '<br>')}</td></tr>
            <tr><th>地圖</th><td>${spot.googleMap ? `<a href="${spot.googleMap}" target="_blank" class="btn-map">打開 Google Maps</a>` : '-'}</td></tr>
            <tr><th></th><td>*本站所有標示的時間的時區為GMT+9(東京)</td></tr>
            <tr><th></th><td>*定休日的 日月火水木金土 曜日 = 周 日一二三四五六，定休日默認包括年始年末</td></tr>
            <tr><th></th><td>若要前往任何地點請先提前查詢最新消息，例如時間地點定休費用交通等</td></tr>
        </table>
        ${buildGalleryHtml(getDetailImages(spot))}
    `;

    // ✅ 點擊列表後自動捲動到地圖位置
    setTimeout(() => {
        document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function getMarkerColor(categories) {
    const colorMap = {
        1: '#ffcc99', 2: '#99ccff', 3: '#b3e6b3', 4: '#ff9999',
        5: '#ffb6c1', 6: '#cccccc', 7: '#99ffff', 8: '#ffff99',
        9: '#cc99ff', 10: '#f46455', 11: '#3ad6df',
        12: '#cc5a5a', 13: '#3E7F96', 14: '#787878'
    };
    const catId = categories.find(id => id !== 0) || 0;
    return colorMap[catId] || '#4285F4';
}

function createColoredMarker(color) {
    return L.divIcon({
        className: '',
        html: `<div class="custom-marker" style="background:${color};"><div class="custom-marker-inner"></div></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24]
    });
}

// ===== 活動 =====
function renderEvents() {
    const list = document.getElementById('event-list');
    if (!list) return;
    list.innerHTML = '';
    const filtered = eventsData.filter(e => matchesFilter(e.categories, activeEventFilters));
    filtered.forEach(event => {
        const item = document.createElement('div');
        item.className = 'list-item';
        let dateStr = event.startDate === event.endDate ? event.startDate : `${event.startDate} ~ ${event.endDate}`;
        let tagsHtml = event.categories.filter(id => id !== 0).map(id => {
            const cat = eventCategories.find(c => c.id === id);
            return `<span class="tag" style="background-color: ${cat ? cat.colorVar : '#ccc'}">${cat ? cat.name : ''}</span>`;
        }).join('');
        item.innerHTML = `
            ${event.thumb ? `<img src="${imgSrc(event.thumb)}">` : `<div style="width:80px;height:80px;margin-right:15px;background:#eee;"></div>`}
            <div class="info">
                <div class="title">${event.name}</div>
                <div style="font-size:12px; color:#666; margin-bottom:5px;">${dateStr}</div>
                <div class="tags">${tagsHtml}</div>
            </div>
        `;
        item.onclick = () => showEventDetails(event);
        list.appendChild(item);
    });
}

// 顯示活動詳細資料 + 底部圖片庫
function showEventDetails(event) {
    const details = document.getElementById('event-details');
    details.style.display = 'block';
    let dateStr = event.startDate === event.endDate ? event.startDate : `${event.startDate} ~ ${event.endDate}`;
    details.innerHTML = `
        <h2 style="font-size: 1.2em; font-weight: bold; margin-bottom: 10px; color: #333;">${event.name}</h2>
        <table class="details-table">
            <tr><th>日期</th><td>${dateStr}</td></tr>
            <tr><th>時間(GMT+9)</th><td>${event.time || '-'}</td></tr>
            <tr><th>地點</th><td>${event.location || '-'} ${event.googleMap ? `<a href="${event.googleMap}" target="_blank" class="btn-map" style="margin-left:5px;">地圖</a>` : ''}</td></tr>
            <tr><th>說明</th><td>${(event.description || '-').replace(/\n/g, '<br>')}</td></tr>
        </table>
        ${buildGalleryHtml(getDetailImages(event))}
    `;
    // ✅ 月曆跳到該活動日期並捲動到月曆位置
    jumpCalendarToEvent(event);
}

// ===== 日曆 =====
function createDayCell(dayNum, isOtherMonth, isToday = false) {
    const cell = document.createElement('div');
    cell.className = 'cal-day';
    if (isOtherMonth) cell.classList.add('other-month');
    if (isToday) cell.classList.add('today');
    const numSpan = document.createElement('div');
    numSpan.className = 'day-number';
    numSpan.innerText = dayNum;
    cell.appendChild(numSpan);
    return cell;
}

function changeMonth(offset) {
    currentCalMonth += offset;
    if (currentCalMonth > 11) { currentCalMonth = 0; currentCalYear++; }
    else if (currentCalMonth < 0) { currentCalMonth = 11; currentCalYear--; }
}

function renderEventsForCalendar() {
    const list = document.getElementById('event-list');
    if (!list) return;
    list.innerHTML = '';
    const monthStart = `${currentCalYear}-${String(currentCalMonth + 1).padStart(2, '0')}-01`;
    const monthEnd = `${currentCalYear}-${String(currentCalMonth + 1).padStart(2, '0')}-31`;
    const filtered = eventsData.filter(e =>
        matchesFilter(e.categories, activeEventFilters) &&
        e.startDate <= monthEnd && e.endDate >= monthStart
    );
    if (filtered.length === 0) {
        list.innerHTML = '<p style="color:#999; text-align:center; padding:20px;">本月暫無相關活動</p>';
        return;
    }
    filtered.forEach(event => {
        const item = document.createElement('div');
        item.className = 'list-item';
        let dateStr = event.startDate === event.endDate ? event.startDate : `${event.startDate} ~ ${event.endDate}`;
        let tagsHtml = event.categories.filter(id => id !== 0).map(id => {
            const cat = eventCategories.find(c => c.id === id);
            return `<span class="tag" style="background-color: ${cat ? cat.colorVar : '#ccc'}">${cat ? cat.name : ''}</span>`;
        }).join('');
        item.innerHTML = `
            ${event.thumb ? `<img src="${imgSrc(event.thumb)}" alt="thumb">` : `<div style="width:60px;height:60px;margin-right:10px;background:#eee;border-radius:4px;"></div>`}
            <div class="info">
                <div class="title" style="font-size:14px;">${event.name}</div>
                <div style="font-size:12px; color:#666; margin-bottom:5px;">${dateStr}</div>
                <div class="tags">${tagsHtml}</div>
            </div>
        `;
        item.onclick = () => showEventDetails(event);
        list.appendChild(item);
    });
}

// FullCalendar 的 end 日期為 Exclusive，需要 +1 天
function addOneDay(dateStr) {
    if (!dateStr) return dateStr;
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function initFullCalendar() {
    const calendarEl = document.getElementById('calendar-container');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ja',
        height: 'auto',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listMonth'
        },
        buttonText: { today: '今天', month: '月', list: '列表' },
        events: [],
        dateClick: function (info) { showEventsByDate(info.dateStr); },
        eventClick: function (info) {
            const eventId = info.event.id;
            highlightEventInList(eventId);
            showEventDetailsById(eventId);
        },
        eventContent: function (arg) {
            let bold = document.createElement('b');
            bold.innerText = arg.event.title;
            return { domNodes: [bold] };
        }
    });
    calendar.render();
    refreshCalendarEvents();
}

function refreshCalendarAndList() {
    const filteredEvents = eventsData.filter(e => matchesFilter(e.categories, activeEventFilters));
    if (calendar) {
        const calendarEvents = filteredEvents.map(e => ({
            id: e.id,
            title: e.name,
            start: e.startDate,
            end: addOneDay(e.endDate),
            color: getCategoryColor(e.categories[0]),
            textColor: '#000'
        }));
        calendar.removeAllEvents();
        calendar.addEventSource(calendarEvents);
    }
    renderEventList(filteredEvents);
}

function refreshCalendarEvents() {
    refreshCalendarAndList();
}

// 獲取分類顏色
function getCategoryColor(catId) {
    const colorMap = {
        0: '#7eb37e', 1: '#ffcc99', 2: '#99ccff', 3: '#b3e6b3',
        4: '#ff9999', 5: '#ffb6c1', 6: '#cccccc', 7: '#99ffff',
        8: '#ffff99', 9: '#cc99ff', 10: '#f46455', 11: '#3ad6df',
        12: '#cc5a5a', 13: '#3E7F96', 14: '#787878'
    };
    return colorMap[catId] || '#4285F4';
}

function renderEventList(eventsToRender) {
    const list = document.getElementById('event-list');
    if (!list) return;
    list.innerHTML = '';
    eventsToRender.forEach(event => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.dataset.id = event.id;
        let dateStr = event.startDate === event.endDate ? event.startDate : `${event.startDate} ~ ${event.endDate}`;
        let tagsHtml = event.categories.filter(id => id !== 0).map(id => {
            const cat = eventCategories.find(c => c.id === id);
            return `<span class="tag" style="background-color: ${cat ? cat.colorVar : '#ccc'}">${cat ? cat.name : ''}</span>`;
        }).join('');
        item.innerHTML = `
            ${event.thumb ? `<img src="${imgSrc(event.thumb)}">` : `<div style="width:80px;height:80px;margin-right:15px;background:#eee;"></div>`}
            <div class="info">
                <div class="title">${event.name}</div>
                <div style="font-size:12px; color:#666; margin-bottom:5px;">${dateStr}</div>
                <div class="tags">${tagsHtml}</div>
            </div>
        `;
        item.onclick = () => {
            highlightEventInList(event.id);
            showEventDetails(event);
        };
        list.appendChild(item);
    });
}

function highlightEventInList(eventId) {
    document.querySelectorAll('#event-list .list-item').forEach(el => {
        el.classList.remove('selected');
        if (el.dataset.id == eventId) {
            el.classList.add('selected');
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

// 通過 ID 顯示詳情 + 底部圖片庫
function showEventDetailsById(eventId) {
    const event = eventsData.find(e => e.id == eventId);
    if (event) {
        const details = document.getElementById('event-details');
        details.style.display = 'block';
        let dateStr = event.startDate === event.endDate ? event.startDate : `${event.startDate} ~ ${event.endDate}`;
        details.innerHTML = `
            <h2 style="font-size: 1.2em; font-weight: bold; margin-bottom: 10px; color: #333;">${event.name}</h2>
            <table class="details-table">
                <tr><th>日期</th><td>${dateStr}</td></tr>
                <tr><th>時間</th><td>${event.time || '-'}</td></tr>
                <tr><th>地點</th><td>${event.location || '-'} ${event.googleMap ? `<a href="${event.googleMap}" target="_blank" class="btn-map" style="margin-left:5px;">地圖</a>` : ''}</td></tr>
                <tr><th>說明</th><td>${(event.description || '-').replace(/\n/g, '<br>')}</td></tr>
            </table>
            ${buildGalleryHtml(getDetailImages(event))}
        `;
        // ✅ 月曆跳到該活動日期並捲動到月曆位置
        jumpCalendarToEvent(event);
    }
}

function showEventsByDate(dateStr) {
    const details = document.getElementById('event-details');
    details.style.display = 'block';
    const dayEvents = eventsData.filter(e => {
        return dateStr >= e.startDate && dateStr <= e.endDate && matchesFilter(e.categories, activeEventFilters);
    });
    if (dayEvents.length === 0) {
        details.innerHTML = `<h3>${dateStr}</h3><p style="color:#666;">這一天沒有安排的活動。</p>`;
        return;
    }
    let html = `<h3 style="margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">${dateStr} 的活動 (${dayEvents.length})</h3>`;
    dayEvents.forEach(event => {
        html += `
            <div style="margin-bottom: 15px; padding: 10px; background: #f9f9f9; border-radius: 4px; cursor: pointer;" onclick="highlightEventInList(${event.id}); showEventDetailsById(${event.id})">
                <div style="font-weight:bold; color:#333;">${event.name}</div>
                <div style="font-size:12px; color:#666; margin-top:4px;">📍 ${event.location || '地點不詳'} | ⏰ ${event.time || '時間不詳'}</div>
            </div>
        `;
    });
    details.innerHTML = html;
}

// ✅ 新增：點擊列表項目後，月曆自動跳到活動日期，並捲動到月曆位置
function jumpCalendarToEvent(event) {
    if (calendar && event.startDate) {
        calendar.gotoDate(event.startDate);   // FullCalendar 跳到活動所在日期/月份
    }
    setTimeout(() => {
        const calEl = document.getElementById('calendar-container');
        if (calEl) calEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}
