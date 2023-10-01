// start-mark-c0e8ccb0
(() => {
  let ele = document.createElement('div');
  ele.innerHTML = `<div id="c0e8ccb0">
  <style>
    #c0e8ccb0 {
      display: block;
      padding: 8px;
      margin: 8px;
      border-radius: 8px;
      border: 1px #fff solid;
      box-sizing: border-box;
    }
    #c0e8ccb0 button {
      display: block;
      border: 1px solid #8ab4f8;
      border-radius: 4px;
      color: #8ab4f8;
      background-color: transparent;
      margin: 4px;
      padding: 8px 16px;
      font-size: 1rem;
      transition: all 0.2s ease;
      user-select: none;
    }
    #c0e8ccb0 button:hover {
      background-color: rgba(112, 112, 112, 0.3);
    }
    #c0e8ccb0 span.explain {
      display: block;
      line-height: 100%;
      font-size: 1rem;
      margin-bottom: 4px;
      user-select: none;
    }
    #c0e8ccb0 .savesList {
      display: block;
      padding: 8px;
      border-radius: 8px;
      border: 1px #fff solid;
      box-sizing: border-box;
    }
    #c0e8ccb0 .savesList .savesListRow {
      max-height: 7em;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
    }
    #c0e8ccb0 .savesList .savesListRow:not(:last-child) {
      border-bottom: 1px solid gray;
    }
    #c0e8ccb0 .savesList .savesListRow .saveGroup {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      flex-grow: 1;
      flex-shrink: 1;
      min-width: 0;
      padding: 4px 0;
    }
    #c0e8ccb0 .savesList .savesListRow .saveGroup > * {
      display: flex;
      justify-content: center;
      /* margin: 0 10px; */
      flex-grow: 0;
      flex-shrink: 0;
    }
    #c0e8ccb0 .savesList .savesListRow .saveId {
      min-width: 2em;
      margin-left: 4px;
      margin-right: -6px;
    }
    #c0e8ccb0 .savesList .savesListRow .saveButton {
      display: flex;
      justify-content: center;
      min-width: 110px;
      margin: 0 10px;
    }
    #c0e8ccb0 .savesList .savesListRow .saveName {
      width: 80px;
    }
    #c0e8ccb0 .savesList .savesListRow .saveDetails {
      display: flex;
      flex: 1 1 0;
      flex-direction: column;
      align-items: stretch;
      justify-content: stretch;
      min-width: 100px;
    }
    #c0e8ccb0 .savesList .savesListRow .deleteButton {
      float: right;
    }
    #c0e8ccb0 .savesList .savesListRow input:not(:disabled) {
      background-color: #4372FF;
    }
  </style>
  <span class="explain" style="font-size: 1.5rem">云备份</span>
  <span class="explain" style="margin-bottom: 8px">
    (此为备份浏览器存储) 服务密钥:
    <span style="color: #4caf50">************************************</span>
  </span>
  <button onclick="c0e8ccb0_getlist()">重新获取列表</button>
  <div class="savesList"></div>
</div>
`;
  list.append(ele.firstElementChild);

  // let ele_s = document.createElement('script');
  // ele_s.innerHTML = ``;
  // list.append(ele_s);

  window.c0e8ccb0_getlist = c0e8ccb0_getlist;
  window.c0e8ccb0_redrawList = c0e8ccb0_redrawList;
  window.c0e8ccb0_save = c0e8ccb0_save;
  window.c0e8ccb0_delete = c0e8ccb0_delete;
  window.c0e8ccb0_load = c0e8ccb0_load;
  window.c0e8ccb0_token = '9d57ba51-34eb-40cc-90fb-99b37543c19e';
  if (document.querySelector('#c0e8ccb0 .savesList')) {
    c0e8ccb0_getlist();
  } else {
    // 选择要观察的目标节点
    // const targetNode = document.querySelector('#your-target-element');
    const targetNode = list;

    // 创建一个MutationObserver实例，传入回调函数
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          // 节点被添加或删除
          console.log('节点被添加或删除');
          if (document.querySelector('#c0e8ccb0 .savesList')) {
            observer.disconnect();
            c0e8ccb0_getlist();
          }
        }
      }
    });

    // 配置观察选项
    const config = {
      childList: true, // 观察目标节点的子节点变化
    };

    // 启动观察器并开始观察目标节点
    observer.observe(targetNode, config);

    // 停止观察
    // observer.disconnect();
  }
  async function c0e8ccb0_getlist() {
    document.querySelector('#c0e8ccb0 .savesList').innerHTML = 'Loading...';
    let list_data = await (
      await fetch('https://oss.lukas1.eu.org/getList/' + c0e8ccb0_token)
    ).json();
    console.log(list_data);
    c0e8ccb0_redrawList(list_data);
  }
  function c0e8ccb0_redrawList(data) {
    const listElement = document.querySelector('#c0e8ccb0 .savesList');
    listElement.innerHTML =
      '<div class="savesListRow"><div class="saveGroup"><div class="saveId">#</div><div class="saveButton">保存/加载</div><div class="saveName">ID/名称</div><div class="saveDetails">更新时间</div><div class="deleteButton"></div></div></div>'; // Clear previous content

    let temp_editedData = {};
    data.map((item, index) => {
      temp_editedData[item.name.replace(/\.[^.]+$/, '')] = {
        had: true,
        name: item.name,
        url: item.url,
        update: item['updated-time'],
      };
      return;
    });
    let editedData = [];
    for (let i = 1; i <= 20; i++) {
      if (temp_editedData[i]) {
        editedData[i] = temp_editedData[i];
      } else {
        editedData[i] = { had: false };
      }
    }

    // Create a list item for each data item
    editedData.forEach((item, index) => {
      let listRow = document.createElement('div');
      listRow.innerHTML = `<div class="savesListRow">
      <div class="saveGroup">
        <div class="saveId">${index}</div>
        <div class="saveButton">
          <input type="button" value="保存" onclick="c0e8ccb0_save(event.target.parentElement.parentElement.parentElement.getAttribute('saveId'));">
          <input type="button" value="加载" onclick="c0e8ccb0_load(event.target.parentElement.parentElement.parentElement.getAttribute('saveUrl'));" ${
            item.had ? '' : 'disabled=""'
          }">
        </div>
        <div class="saveName">${item.had ? '存在数据' : ''}</div>
        <div class="saveDetails" style="color: #4caf50;">${
          item.update ? new Date(item.update).toLocaleString() : ''
        }</div>
        <input class="deleteButton" type="button" value="删除" onclick="confirm('# ${index}\u005c\u006e确定删除此备份？')&&c0e8ccb0_delete(event.target.parentElement.parentElement.getAttribute('saveName'));" ${
        item.had ? '' : 'disabled=""'
      }">
      </div>
    </div>`;
      listRow.firstElementChild.setAttribute('had', item.had);
      listRow.firstElementChild.setAttribute('saveId', index);
      if (item.name)
        listRow.firstElementChild.setAttribute('saveName', item.name);
      if (item.url) listRow.firstElementChild.setAttribute('saveUrl', item.url);

      listElement.appendChild(listRow.firstElementChild);
    });
  }

  async function c0e8ccb0_save(id) {
    console.log('Saving', id);
    const compressionWasEnabled = DoLSave.isCompressionEnabled();
    DoLSave.disableCompression();
    updateExportDay();
    const backupData = {
      localStorage: backupLocalStorage(),
      sessionStorage: backupSessionStorage(),
      cookies: backupCookies(),
      indexedDB: await backupIndexedDB(),
    };
    const backupDataJSON = JSON.stringify(backupData);
    if (compressionWasEnabled) DoLSave.enableCompression();
    console.log(backupDataJSON);
    const result = await (
      await fetch('https://oss.lukas1.eu.org/setFile/', {
        method: 'POST',
        body: JSON.stringify({
          password: c0e8ccb0_token,
          folder: c0e8ccb0_token,
          name: id,
          content: backupDataJSON,
        }),
      })
    ).text();
    console.log(result);
    c0e8ccb0_getlist();

    // 备份LocalStorage
    function backupLocalStorage() {
      const localStorageData = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        localStorageData[key] = value;
      }
      return localStorageData;
    }
    // 备份SessionStorage
    function backupSessionStorage() {
      const sessionStorageData = {};
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        sessionStorageData[key] = value;
      }
      return sessionStorageData;
    }
    // 备份Cookies
    function backupCookies() {
      const cookiesData = document.cookie || '';
      return cookiesData;
    }
    function backupIndexedDB() {
      return new Promise((resolve, reject) => {
        // 打开 indexedDB 数据库
        const dbName = 'degrees-of-lewdity'; // 替换成您的数据库名称
        const request = indexedDB.open(dbName);

        request.onerror = function (event) {
          reject('打开数据库失败 errorCode:' + event.target.errorCode);
        };

        request.onsuccess = function (event) {
          const db = event.target.result;
          // 获取所有对象存储空间的名称
          const objectStoreNames = db.objectStoreNames;
          // 创建一个包含所有对象存储的备份对象
          const indexedDBBackup = {};
          // 遍历对象存储并备份数据
          Array.from(objectStoreNames).forEach(objectStoreName => {
            const transaction = db.transaction(objectStoreName, 'readonly');
            const objectStore = transaction.objectStore(objectStoreName);
            const objectStoreData = [];
            objectStore.openCursor().onsuccess = function (event) {
              const cursor = event.target.result;
              if (cursor) {
                objectStoreData.push(cursor.value);
                cursor.continue();
              } else {
                indexedDBBackup[objectStoreName] = objectStoreData;
                // 检查是否备份完所有对象存储
                if (
                  Object.keys(indexedDBBackup).length ===
                  objectStoreNames.length
                ) {
                  resolve(indexedDBBackup);
                }
              }
            };
          });
        };
      });
    }
  }
  async function c0e8ccb0_delete(name) {
    console.log('Deleting', name);
    const result = await (
      await fetch('https://oss.lukas1.eu.org/delFile/', {
        method: 'POST',
        body: JSON.stringify({
          password: c0e8ccb0_token,
          folder: c0e8ccb0_token,
          name: name,
        }),
      })
    ).text();
    console.log(result);
    c0e8ccb0_getlist();
  }
  async function c0e8ccb0_load(url, use_proxy = true) {
    console.log('Loading', url, '(' + (use_proxy ? '' : 'not ') + 'use proxy)');
    const input = await (
      await fetch(use_proxy ? 'https://oss.lukas1.eu.org/getFile/' : '' + url)
    ).json();
    console.log(input);

    console.log(restoreLocalStorage(input));
    console.log(restoreSessionStorage(input));
    console.log(restoreCookies(input));
    console.log(await restoreIndexedDB(input));
    location.reload();

    // 恢复localStorage
    function restoreLocalStorage(backupData) {
      if (!backupData.localStorage) return;
      for (const key in backupData.localStorage) {
        localStorage.setItem(key, backupData.localStorage[key]);
      }
      return '恢复localStorage成功';
    }
    // 恢复sessionStorage
    function restoreSessionStorage(backupData) {
      if (!backupData.sessionStorage) return;
      for (const key in backupData.sessionStorage) {
        sessionStorage.setItem(key, backupData.sessionStorage[key]);
      }
      return '恢复sessionStorage成功';
    }
    // 恢复cookies
    function restoreCookies(backupData) {
      if (!backupData.cookies) return;
      document.cookie = backupData.cookies;
      return '恢复cookies成功';
    }
    // 恢复indexedDB
    async function restoreIndexedDB(backupData) {
      if (!backupData.indexedDB) return;
      return new Promise(async (resolve, reject) => {
        // 打开 IndexedDB 数据库
        const dbName = 'degrees-of-lewdity'; // 替换成您的数据库名称
        const request = indexedDB.open(dbName);

        request.onerror = function (event) {
          reject('打开数据库失败 errorCode:' + event.target.errorCode);
        };
        request.onsuccess = function (event) {
          console.log('数据库打开成功');

          const db = event.target.result;
          const indexedDBBackup = backupData.indexedDB;
          for (const storeName in indexedDBBackup) {
            const store = db
              .transaction(storeName, 'readwrite')
              .objectStore(storeName);
            store.clear();
            for (const key in indexedDBBackup[storeName]) {
              store.put(indexedDBBackup[storeName][key]);
            }
          }
          resolve('恢复indexedDB成功');
        };
      });
    }
  }
})();
// end-mark-c0e8ccb0
