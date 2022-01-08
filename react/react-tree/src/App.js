import { useState } from "react";
import { Tree, Input, Checkbox } from "antd";

const { Search } = Input;

const CheckboxNode = (props) => {
  const { title } = props;
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>{title}</span>
      <Checkbox.Group options={["learned", "used", "fluent"]} />
    </div>
  );
};

const gData = [
  {
    key: "0-0",
    title: "TypeScript",
    unvisibleTitle: "TypeScript",
    children: [
      {
        key: "0-0-0",
        title: "Type",
        unvisibleTitle: "Type",
        children: [
          {
            key: "0-0-0-0",
            unvisibleTitle: "boolean",
            title: "boolean",
          },
          { key: "0-0-0-1", unvisibleTitle: "number", title: "number" },
          { key: "0-0-0-2", unvisibleTitle: "string", title: "string" },
        ],
      },
      {
        key: "0-0-1",
        title: "Interface",
        unvisibleTitle: "Interface",
        children: [
          { key: "0-0-1-0", unvisibleTitle: "implements", title: "implements" },
          {
            key: "0-0-1-1",
            unvisibleTitle: "optional-property",
            title: "optional-property",
          },
          { key: "0-0-1-2", unvisibleTitle: "indexable", title: "indexable" },
        ],
      },
      {
        key: "0-0-2",
        title: "Generic",
        unvisibleTitle: "Generic",
      },
    ],
  },
  {
    key: "0-1",
    title: "TDD",
    unvisibleTitle: "TDD",
    children: [
      {
        key: "0-1-0",
        title: "RED",
        unvisibleTitle: "RED",
        children: [
          {
            key: "0-1-0-0",
            unvisibleTitle: "Write-a-test",
            title: "Write-a-test",
          },
          { key: "0-1-0-1", unvisibleTitle: "Test-fails", title: "Test-fails" },
          {
            key: "0-1-0-2",
            unvisibleTitle: "Try-to-pass",
            title: "Try-to-pass",
          },
        ],
      },
      {
        key: "0-1-1",
        title: "GREEN",
        unvisibleTitle: "GREEN",
        children: [
          {
            key: "0-1-1-0",
            unvisibleTitle: "Wrtie-code-make-test-pass",
            title: "Wrtie-code-make-test-pass",
          },
          {
            key: "0-1-1-1",
            unvisibleTitle: "code-passes-test",
            title: "code-passes-test",
          },
          { key: "0-1-1-2", unvisibleTitle: "Say-yeah", title: "Say-yeah" },
        ],
      },
      {
        key: "0-1-2",
        title: "REFACTOR",
        unvisibleTitle: "REFACTOR",
      },
    ],
  },
  {
    key: "0-2",
    title: "SCSS",
    unvisibleTitle: "SCSS",
  },
];
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key, title, unvisibleTitle } = node;
    dataList.push({ key, title, unvisibleTitle });
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

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e) => {
    const { value } = e.target;
    const expandedKeys = dataList
      .map((item) => {
        if (item.unvisibleTitle.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(expandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const loop = (data) => {
    return data.map((item) => {
      const index = item.unvisibleTitle.indexOf(searchValue);
      const beforeStr = item.unvisibleTitle.substr(0, index);
      const afterStr = item.unvisibleTitle.substr(index + searchValue.length);
      const unvisibleTitle =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      const title = <CheckboxNode title={unvisibleTitle} />;
      if (item.children) {
        return {
          title: unvisibleTitle,
          unvisibleTitle,
          key: item.key,
          children: loop(item.children),
        };
      }

      return {
        title,
        unvisibleTitle,
        key: item.key,
      };
    });
  };

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
        blockNode={true}
      />
    </div>
  );
};

export default App;
