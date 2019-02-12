import React from "react";
import { Icon, Tooltip } from "antd";
import "./style.less";

export default ({onClick, collapsed, onMouseEnter, onMouseLeave, visibleTooltip}) => (
    <div className="trigger" onClick={onClick}>
      <Tooltip placement="right" title="Expandir" visible={visibleTooltip}>
        <Icon onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
          type={collapsed ? "right-circle" : "left-circle"}
        />
      </Tooltip>
      <span>
        {!collapsed && "Esconder"}
      </span>
    </div>
  )