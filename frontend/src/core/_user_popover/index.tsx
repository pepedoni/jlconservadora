import React from "react";
import { Avatar, Icon, Row, Col, Badge } from "antd";
import "./style.less";
import { Link } from "react-router-dom";

export default ({userName, companyName, hasNotification, logout}) => (
  <div className="user-popover">
    <div className="personal-info">
      <span className="name">
        {userName}
      </span>
      <span className="company">
        {companyName}
      </span>
    </div>
    <div className="settings">
      <div>
        <Link to="/notifications">
          <Badge dot={hasNotification}>
            <Icon type="bell" />
          </Badge>
          <span>
            Notificações
          </span>
        </Link>
      </div>
      <div>
        <Link to="/billing">
          <Icon type="credit-card" />
          <span>
            Pagamento
          </span>
        </Link>
      </div>
      <div>
        <Link to="/settings">
          <Icon type="setting" />
          <span>
            Configurações
          </span>
        </Link>
      </div>
    </div>
    <div className="logout" onClick={logout}>
      <Icon type="logout" />
      <span>
        Sair
      </span>
    </div>
  </div>
)