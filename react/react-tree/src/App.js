import { useState } from "react";
import { Tree, Input } from "antd";

const { Search } = Input;

// const x = 3;
// const y = 2;
// const z = 1;
// const gData = [];

// const generateData = (_level, _preKey, _tns) => {
//   const preKey = _preKey || "0";
//   const tns = _tns || gData;

//   const children = [];
//   for (let i = 0; i < x; i++) {
//     // 3 - 3개의 노드를 만들 것이다.
//     const key = `${preKey}-${i}`;
//     tns.push({ title: key, key });
//     if (i < y) {
//       // 2 - 2로 끝나는 노드 부터는 children이 없다.
//       children.push(key);
//     }
//   }
//   if (_level < 0) {
//     return tns;
//   }
//   const level = _level - 1;
//   children.forEach((key, index) => {
//     tns[index].children = [];
//     return generateData(level, key, tns[index].children);
//   });
// };
// generateData(z); // 1 - tree의 depth가 2단계이다.

const gData = [
  {
    key: "0-0",
    title: "TypeScript",
    children: [
      {
        key: "0-0-0",
        title: "Type",
        children: [
          { key: "0-0-0-0", title: "boolean" },
          { key: "0-0-0-1", title: "number" },
          { key: "0-0-0-2", title: "string" },
        ],
      },
      {
        key: "0-0-1",
        title: "Interface",
        children: [
          { key: "0-0-1-0", title: "implements" },
          { key: "0-0-1-1", title: "optional-property" },
          { key: "0-0-1-2", title: "indexable" },
        ],
      },
      {
        key: "0-0-2",
        title: "Generic",
      },
    ],
  },
  {
    key: "0-1",
    title: "TDD",
    children: [
      {
        key: "0-1-0",
        title: "RED",
        children: [
          { key: "0-1-0-0", title: "Write-a-test" },
          { key: "0-1-0-1", title: "Test-fails" },
          { key: "0-1-0-2", title: "Try-to-pass" },
        ],
      },
      {
        key: "0-1-1",
        title: "GREEN",
        children: [
          { key: "0-1-1-0", title: "Wrtie-code-make-test-pass" },
          { key: "0-1-1-1", title: "code-passes-test" },
          { key: "0-1-1-2", title: "Say-yeah" },
        ],
      },
      {
        key: "0-1-2",
        title: "REFACTOR",
      },
    ],
  },
  {
    key: "0-2",
    title: "SCSS",
  },
];
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key, title } = node;
    dataList.push({ key, title });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

const App = () => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  console.log("gData", gData);
  console.log("dataList", dataList);

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e) => {
    const { value } = e.target;
    const expandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(expandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const loop = (data) =>
    data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });

  return (
    <div>
      <Search
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={onChange}
      />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={loop(gData)}
      />
    </div>
  );
};

export default App;
