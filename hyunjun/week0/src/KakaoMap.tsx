import React, { useEffect, useRef, useState } from "react";

const KakaoMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null); // 지도를 표시할 div의 레퍼런스
  const [map, setMap] = useState<any>(null); // 지도 객체를 상태로 저장
  const [level, setLevel] = useState<number>(3); // 현재 지도 레벨을 상태로 저장
  const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어 상태 저장

// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    var infowindow = new window.kakao.maps.InfoWindow({zIndex:1});
  useEffect(() => {
    // Kakao Maps API가 로드된 후에 실행
    if (window.kakao && mapContainer.current) {
      const options = {
        center: new window.kakao.maps.LatLng(37.374474020920864, 126.63361466845616), // 중심 좌표 설정
        level: 3, // 확대 레벨 설정
      };
      
      const kakaoMap = new window.kakao.maps.Map(mapContainer.current, options); // 지도 생성
      setMap(kakaoMap); // 지도 객체 상태 저장

      displayLevel(kakaoMap); // 초기 레벨 표시

      
    }
  }, []);

  const zoomIn = () => {
    if (map) {
      const currentLevel = map.getLevel();
      map.setLevel(currentLevel - 1);
      setLevel(map.getLevel()); // 지도 레벨 상태 업데이트
    }
  };

  const zoomOut = () => {
    if (map) {
      const currentLevel = map.getLevel();
      map.setLevel(currentLevel + 1);
      setLevel(map.getLevel()); // 지도 레벨 상태 업데이트
    }
  };

  const displayLevel = (kakaoMap: any) => {
    setLevel(kakaoMap.getLevel());
  };

  const handleSearch =()=> {
    // 장소 검색 객체를 생성합니다
    var ps = new window.kakao.maps.services.Places(); 
    // 키워드로 장소를 검색합니다
    ps.keywordSearch(searchQuery, placesSearchCB); 
  }

  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB(data: any[], status: any, pagination: any) {
    if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new window.kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    }
}


// 장소 객체의 타입 정의
interface Place {
    y: string;         // 위도
    x: string;         // 경도
    place_name: string; // 장소명
    // 필요시 추가적인 프로퍼티를 여기에 정의할 수 있습니다.
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place: Place) {
    // 마커를 생성하고 지도에 표시합니다
    var marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    // 마커에 클릭이벤트를 등록합니다
    window.kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}



  

  return (
    <div>
      <div
        ref={mapContainer}
        style={{ width: "500px", height: "400px" }}
      ></div>
      <p>
        <button onClick={zoomIn}>지도레벨 - 1</button>
        <button onClick={zoomOut}>지도레벨 + 1</button>
        <span>현재 지도 레벨은 {level} 레벨 입니다.</span>
      </p>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="주소를 입력하세요"
        />
        <button onClick={handleSearch}>검색</button>
      </div>
    </div>
  );
};

export default KakaoMap;
