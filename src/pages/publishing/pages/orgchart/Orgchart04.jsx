import React, { useCallback } from 'react';
import { Tree } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';

const OrganizationTree = () => {
  const [treeData, setTreeData] = React.useState([
    {
      title: '최상위 팀',
      key: '0',
      children: [
        {
          title: '팀 A',
          key: '0-0',
          children: [
            { title: '하위 팀 A1', key: '0-0-0' },
            { title: '하위 팀 A2', key: '0-0-1' },
          ],
        },
        {
          title: '팀 B',
          key: '0-1',
          children: [
            { title: '하위 팀 B1', key: '0-1-0' },
            { title: '하위 팀 B2', key: '0-1-1' },
          ],
        },
      ],
    },
  ]);

  const backend = isMobile ? TouchBackend : HTML5Backend;

  const onDragEnter = (info) => {
    console.log('Drag enter:', info);
  };

  const onDrop = useCallback(
    (info) => {
      console.log('Drop info:', info);
      const dropKey = info.node.key;
      const dragKey = info.dragNode.key;
      const dropPos = info.node.pos.split('-');
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

      const loop = (data, key, callback) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].key === key) {
            return callback(data[i], i, data);
          }
          if (data[i].children) {
            loop(data[i].children, key, callback);
          }
        }
      };

      const data = [...treeData];

      // Find dragObject
      let dragObj;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });

      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, (item) => {
          item.children = item.children || [];
          item.children.unshift(dragObj);
        });
      } else if (
        (info.node.children || []).length > 0 && // Has children
        info.node.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, (item) => {
          item.children = item.children || [];
          item.children.unshift(dragObj);
        });
      } else {
        let ar;
        let i;
        loop(data, dropKey, (item, index, arr) => {
          ar = arr;
          i = index;
        });
        if (dropPosition === -1) {
          ar.splice(i, 0, dragObj);
        } else {
          ar.splice(i + 1, 0, dragObj);
        }
      }

      setTreeData(data);
    },
    [treeData]
  );

  return (
    <DndProvider backend={backend}>
      <div style={{ padding: '20px' }}>
        <h1>조직도</h1>
        <Tree
          className="draggable-tree"
          draggable
          blockNode
          onDragEnter={onDragEnter}
          onDrop={onDrop}
          treeData={treeData}
        />
      </div>
    </DndProvider>
  );
};

export default OrganizationTree;
